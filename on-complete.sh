#!/bin/bash

exec 69>./on-complete.lock || exit 1
flock 69 || exit 1

#this paths variable only works for this repo inside heroku

filePath="./$3"
fileName=${filePath##*/}
dwnldir="./downloads/"
tmp1=${filePath#./*/}
folderName=${tmp1%%/*}
folderPath=${dwnldir}${folderName}

LIGHT_GREEN_FONT_PREFIX="\033[1;32m"
FONT_COLOR_SUFFIX="\033[0m"
INFO="[${LIGHT_GREEN_FONT_PREFIX}INFO${FONT_COLOR_SUFFIX}]"

echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Delete .aria2 file ..."

if [ $2 -eq 0 ]; then
    rm -rvf ./on-complete.lock
    exit 0
elif [ -e "${filePath}.aria2" ]; then
    rm -vf "${filePath}.aria2"
elif [ -e "${folderPath}.aria2" ]; then
    rm -vf "${folderPath}.aria2"
fi

echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Delete .aria2 file finish"
echo "$(($(cat numUpload)+1))" > numUpload # Plus 1

if [[ $2 -eq 1 ]]; then # single file
	echo "Transfering ${fileName} to Destination"
	rclone -v --local-no-check-updated --ignore-existing --exclude "{*.txt,*.html}" --config="rclone.conf" move "$filePath" "DRIVE:$RCLONE_DESTINATION" 2>&1	
elif [[ $2 -gt 1 ]]; then # multiple file
	echo "Transfering ${folderName} to Destination"
	rclone -v --delete-empty-src-dirs --local-no-check-updated --ignore-existing --exclude "{*.txt,*.html}" --config="rclone.conf" move "$folderPath" "DRIVE:$RCLONE_DESTINATION/${folderName}" 2>&1
	rclone --config="rclone.conf" rmdirs --leave-root "${folderPath}" 2>&1
fi

echo "$(($(cat numUpload)-1))" > numUpload # Minus 1
rm -rvf ./on-complete.lock
