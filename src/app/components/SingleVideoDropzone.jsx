'use client';

import { formatFileSize } from '@edgestore/react/utils';
import { UploadCloudIcon, X } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

const variants = {
  base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
  video: 'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md',
  active: 'border-2',
  disabled: 'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const SingleVideoDropzone = ({ height, value, onChange, className, disabled, dropzoneOptions }) => {
  const [videoUrl, setVideoUrl] = useState(value);

  const videoPreviewUrl = useMemo(() => {
    if (typeof videoUrl === 'string') {
      return videoUrl;
    } else if (videoUrl) {
      return URL.createObjectURL(videoUrl);
    }
    return null;
  }, [videoUrl]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { 'video/*': [] },
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setVideoUrl(file);
        onChange(file);
      }
    },
    ...dropzoneOptions,
  });

  const dropZoneClassName = useMemo(
    () =>
      twMerge(
        variants.base,
        isFocused && variants.active,
        disabled && variants.disabled,
        videoPreviewUrl && variants.video,
        (isDragReject ?? fileRejections[0]) && variants.reject,
        isDragAccept && variants.accept,
        className
      ).trim(),
    [
      isFocused,
      videoPreviewUrl,
      fileRejections,
      isDragAccept,
      isDragReject,
      disabled,
      className,
    ]
  );

  const errorMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0]?.code === 'file-too-large') {
        return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
      } else if (errors[0]?.code === 'file-invalid-type') {
        return ERROR_MESSAGES.fileInvalidType();
      } else if (errors[0]?.code === 'too-many-files') {
        return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
      } else {
        return ERROR_MESSAGES.fileNotSupported();
      }
    }
    return undefined;
  }, [fileRejections, dropzoneOptions]);

  const handleRemoveVideo = () => {
    setVideoUrl(null);
    onChange(undefined); // Clear the value in the parent component as well
  };

  return (
    <div>
      <div
        {...getRootProps({
          className: dropZoneClassName,
          style: {
            height,
          },
        })}
      >
        {/* Main File Input */}
        <input {...getInputProps()} />

        {videoPreviewUrl ? (
          // Video Preview
          <div className="relative w-full h-full">
            <video
              className="h-full w-full rounded-md object-cover"
              controls
              src={videoPreviewUrl}
              alt={acceptedFiles[0]?.name}
            />
            {/* Remove Video Icon */}
            {!disabled && (
              <div
                className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveVideo();
                }}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                  <X
                    className="text-gray-500 dark:text-gray-400"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Upload Icon
          <div className="flex flex-col items-center justify-center text-xs text-gray-400">
            <UploadCloudIcon className="mb-2 h-7 w-7" />
            <div className="text-gray-400">drag & drop to upload</div>
            <div className="mt-3">
              <Button type="button" disabled={disabled}>
                select
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Error Text */}
      <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
    </div>
  );
};

const Button = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          // base
          'focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
          // color
          'border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700',
          // size
          'h-6 rounded-md px-2 text-xs',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { SingleVideoDropzone };
