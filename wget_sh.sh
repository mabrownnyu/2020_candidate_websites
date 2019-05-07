#!/bin/bash

module purge

while read LINE; 
do
    domain=${LINE#'https://'}
    domain=${domain#'www.'}
    
done < candidate_sites.txt;

datestr=$(date +'%Y/%m/%d')
echo $datestr

/usr/bin/git add --all
/usr/bin/git commit -m "today $datestr updates to candidate websites"
/usr/bin/git push
