#!/bin/bash

module purge

while read LINE; 
do
    domain=${LINE#'https://'}
    domain=${domain#'www.'}
    
    output=${domain/'.com'}
    output=${domain/'.org'}
    
    echo $domain
    echo $output;
    
done < candidate_sites.txt;

datestr=$(date +'%Y/%m/%d')

/usr/bin/git add --all
/usr/bin/git commit -m "today $datestr updates to candidate websites"
/usr/bin/git push
