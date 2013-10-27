---
layout: post
title: Simple image processing with CUDA
#hn: http://news.ycombinator.com/item?id=5017893
---

I like graphics and image processing. So I have been fiddling a little with NVIDIAs CUDA in order to capatilize on some multithreaded programming. I have made a little starter edition for people who wants to try forces with CUDA for image processing.

I am using <a href="http://lodev.org/lodepng/">lodepng</a> for loading and saving images for the filtering. It is very easy to easy, has no dependencies and just works. In my example code I am reading filenames for input and output images from the command line parameters.

Enough talk, let's see some code:

In my `main.cpp` file I load and save images and call the filter. 

    int main(int argc, char** argv) {
        if(argc != 3) {
            std::cout << "Run with input and output image filenames." << std::endl;
            return 0;
        }

        // Read the arguments
        const char* input_file = argv[1];
        const char* output_file = argv[2];

        std::vector<unsigned char> in_image;
        unsigned int width, height;

        // Load the data
        unsigned error = lodepng::decode(in_image, width, height, input_file);
        if(error) std::cout << "decoder error " << error << ": " << lodepng_error_text(error) << std::endl;

        // Prepare the data
        unsigned char* input_image = new unsigned char[(in_image.size()*3)/4];
        unsigned char* output_image = new unsigned char[(in_image.size()*3)/4];
        int where = 0;
        for(int i = 0; i < in_image.size(); ++i) {
           if((i+1) % 4 != 0) {
               input_image[where] = in_image.at(i);
               output_image[where] = 255;
               where++;
           }
        }

        // Run the filter on it
        filter(input_image, output_image, width, height); 

        // Prepare data for output
        std::vector<unsigned char> out_image;
        for(int i = 0; i < in_image.size(); ++i) {
            out_image.push_back(output_image[i]);
            if((i+1) % 3 == 0) {
                out_image.push_back(255);
            }
        }
        
        // Output the data
        error = lodepng::encode(output_file, out_image, width, height);

        //if there's an error, display it
        if(error) std::cout << "encoder error " << error << ": "<< lodepng_error_text(error) << std::endl;

        delete[] input_image;
        delete[] output_image;
        return 0;

    }

We notice how easy lodepng is to use. We tell it we want our image loaded into our vector and voila, we have it. We then remove the alpha channel, as I was not using it in my project. You can however change it to your preferences. We then give our image data to the `filter` function - this is the function which will load the data onto our GPU and call the CUDA kernel which runs our filter. We then save our image, clean up and exits.

Now let's look at some actual CUDA stuff. The code below resides in `kernels.cu`. The CUDA compiler, nvcc, is sort of picky as to what filename extensions it will compile as what. For now, just let the name be.

     void filter (unsigned char* input_image, unsigned char* output_image, int width, int height) {

        unsigned char* dev_input;
        unsigned char* dev_output;
        getError(cudaMalloc( (void**) &dev_input, width*height*3*sizeof(unsigned char)));
        getError(cudaMemcpy( dev_input, input_image, width*height*3*sizeof(unsigned char), cudaMemcpyHostToDevice ));
     
        getError(cudaMalloc( (void**) &dev_output, width*height*3*sizeof(unsigned char)));

        dim3 blockDims(512,1,1);
        dim3 gridDims((unsigned int) ceil((double)(width*height*3/blockDims.x)), 1, 1 );

        filter<<<gridDims, blockDims>>>(dev_input, dev_output, width, height); 


        getError(cudaMemcpy(output_image, dev_output, width*height*3*sizeof(unsigned char), cudaMemcpyDeviceToHost ));

        getError(cudaFree(dev_input));
        getError(cudaFree(dev_output));

    }
   
We allocate and copy our data to the GPU. We need the data on the GPU for the kernels to be able to read it. We also allocate storage for the output image, so we have a place to write the result of the filter to. The <<<>>> is CUDA syntax and will be interpreted when compiled. It tells the compiler how many blocks and grids we are going to use. Mostly every CUDA function an enum `cudaError_t` which is why every CUDA call is surrounded by `getError`. This way we get an error printed to the screen if anything goes wrong. Don't worry too much about it, you can see the code for it in `helpers.cpp`.

Now, let's look at the actual filter, also located in `kernels.cu`.

    __global__
    void blur(unsigned char* input_image, unsigned char* output_image, int width, int height) {

        const unsigned int offset = blockIdx.x*blockDim.x + threadIdx.x;
        int x = offset % width;
        int y = (offset-x)/width;
        int fsize = 5; // Filter size
        if(offset < width*height) {

            float output_red = 0;
            float output_green = 0;
            float output_blue = 0;
            int hits = 0;
            for(int ox = -fsize; ox < fsize+1; ++ox) {
                for(int oy = -fsize; oy < fsize+1; ++oy) {
                    if((x+ox) > -1 && (x+ox) < width && (y+oy) > -1 && (y+oy) < height) {
                        const int currentoffset = (offset+ox+oy*width)*3;
                        output_red += input_image[currentoffset]; 
                        output_green += input_image[currentoffset+1];
                        output_blue += input_image[currentoffset+2];
                        hits++;
                    }
                }
            }
            output_image[offset*3] = output_red/hits;
            output_image[offset*3+1] = output_green/hits;
            output_image[offset*3+2] = output_blue/hits;
            }
    }

Again, the __global__ is a CUDA keyword. For each pixel in the input image we take the average of each of the neighbouring pixels and writes it to the output image. This filter is known as a Box blur. A better blur filter would be the Gaussian blur. I have written a Gaussian function in `helpers.cpp` if you want to try. However, before doing that, just try to play around it and see what happens. I learn best from trial and error, and that is also why graphics and image processing is a subject I like - because you can see the result of your work in an easily understanded way instead of reading thousands of lines of output data.

Notice that we check if our `offset` is actually within the range of `width*height` because it can happen that it will be outside due to the blocks CUDA will run, so remember to keep that. Also we need to remember to check whether or not the pixel we read are actually in our image when doing the box blur as well. You can try to remove them one at a time and see what happens.

So now, try running the program on an image and look at the output image. Blurred, huh? 

I have made a simple compile script for the project as well - it works for linux and MAC OSX. Under Windows I guess it's pretty easy to get it up and running in Visual Studio as well. Good luck. <a href="https://github.com/madsravn/easyCuda"> The code can be found on my github</a>.
