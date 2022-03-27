#! /bin/bash

# echo
# echo
# This script runs exporter.sh then uploader.sh to get NFS60 data to website data folder
echo + Starting Website Data Collection Pipeline...


# echo "$0"
# echo "$BASH_SOURCE"
# https://github.com/koalaman/shellcheck/wiki/SC2128


echo
echo + Pipeline: Running exporter.sh...
"$(dirname "$0")"/exporter.sh
echo

echo
echo + Pipeline: Running uploader.sh...
"$(dirname "$0")"/uploader.sh
echo
echo
