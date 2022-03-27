#! /bin/bash

# the NFS60 requires you to run "Convert Stages to discharge" in a year by year basis
# this script runs it for all the data (all the years) at once
# just update the dates if you need to!


today=$(date +%Y%m%d)
cd /home/forecast/nfs60/workspaces || return


for i in {1940..2021}
  do
    echo "$i"
    /home/forecast/nfs60/bin/run_stages "$i""0101" "$i""1231"
  done

echo "THIS YEAR"
/home/forecast/nfs60/bin/run_stages "20220101" "$today"
