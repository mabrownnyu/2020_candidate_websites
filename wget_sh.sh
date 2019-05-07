#!/bin/bash

module purge

while read LINE; 
do
    /usr/bin/wget $LINE --recursive --page-requisites --html-extension --domains ${LINE#'https://'};
done < candidate_sites.txt;

/usr/bin/git add --all
/usr/bin/git commit -m "todays updates to candidate websites"
/usr/bin/git push