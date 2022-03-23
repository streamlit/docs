from subprocess import run
import os
import pathlib
import sys


def apply_blur_and_rotation(inputpath, maskpath, blur, rotation, desired_size, outputpath):
    temp_size = f'{desired_size * 1.2}x{desired_size * 1.2}'
    final_size = f'{desired_size}x{desired_size}'

    if rotation == 0:
        rotation_commands = []
        final_crop_commands = []
        temp_size = final_size
    else:
        rotation_commands = ['-rotate', str(rotation)]
        final_crop_commands = ['-crop', f'{final_size}+{desired_size * 0.1}+{desired_size * 0.1}']

    run([
        'magick',
        '(',
            '(',
                '(',
                    inputpath,
                    *rotation_commands,
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
        *final_crop_commands,
        '-quality', '70%',
        '-strip',
        outputpath,
    ])


if __name__ == '__main__':
    if len(sys.argv) == 1:
        raise ValueError('Input file or folder is required')

    input_files = sys.argv[1:]

    size = 600
    output_folder = os.path.join('..', 'public', 'images', 'api')
    blur_mask_image_name = 'blurmask.png'

    if len(input_files) == 1:
        if os.path.isdir(input_files[0]):
            input_files = pathlib.Path(input_files[0]).iterdir()
        elif os.path.isfile(input_files[0]):
            pass
        else:
            raise ValueError('Invalid input format')

    for input_image_path in input_files:
        print(input_image_path)

        input_image_name = os.path.basename(input_image_path)
        input_basename, _ = os.path.splitext(input_image_name)

        apply_blur_and_rotation(
            inputpath=input_image_path,
            maskpath=blur_mask_image_name,
            outputpath=os.path.join(output_folder, f'{input_basename}.jpg'),
            blur=0,
            rotation=0,
            desired_size=size,
        )
