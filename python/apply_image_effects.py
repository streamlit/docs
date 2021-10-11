from subprocess import run
import os
import pathlib
import sys


def apply_blur(inputpath, maskpath, blur, desired_size, outputpath):
    temp_size = f'{desired_size * 1.2}x{desired_size * 1.2}'
    final_size = f'{desired_size}x{desired_size}'

    run([
        'magick',
        '(',
            '(',
                '(',
                    inputpath,
                    '-rotate', '-4',
                ')',
                '-thumbnail', temp_size,
                '-crop', f'{temp_size}+0+0',
                '-mattecolor', 'white',
            ')',
            '(',
                maskpath,
                '-resize', temp_size,
            ')',
            '-compose', 'Blur',
            '-set', 'option:compose:args', str(blur),
            '-composite',
        ')',
        '-crop', f'{final_size}+{desired_size * 0.1}+{desired_size * 0.1}',
        outputpath,
    ])


if __name__ == '__main__':
    if len(sys.argv) == 1:
        raise ValueError('Input file or folder is required')

    input = sys.argv[1]

    size = 600
    output_folder = os.path.join('..', 'public', 'images', 'api')
    blur_mask_image_name = 'blurmask.png'

    if os.path.isfile(input):
        input_files = [input]
    elif os.path.isdir(input):
        input_files = pathlib.Path(input).iterdir()
    else:
        raise ValueError('Invalid input format')

    for input_image_path in input_files:
        print(input_image_path)

        input_image_name = os.path.basename(input_image_path)
        input_basename, _ = os.path.splitext(input_image_name)

        apply_blur(
            input_image_path,
            blur_mask_image_name,
            5,
            size,
            os.path.join(output_folder, f'{input_basename}.jpg'),
        )
