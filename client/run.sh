#!/bin/bash
MYAPP_WRAPPER="`readlink -f "$0"`"
HERE="`dirname "$MYAPP_WRAPPER"`"

ln -s /lib/x86_64-linux-gnu/libudev.so.1 $HERE/libudev.so.0

# Always use our versions of ffmpeg libs.
# This also makes RPMs find our library symlinks.
export LD_LIBRARY_PATH=$([ -n "$LD_LIBRARY_PATH" ] && echo "$HERE:$HERE/lib:$LD_LIBRARY_PATH" || echo "$HERE:$HERE/lib")

exec -a "$0" "$HERE/chat-client" "$@"