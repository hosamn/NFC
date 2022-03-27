#! /bin/bash

read -r -t 3 -n 1 -p ">> Continue with dashboard pipeline? (Y/n)"
case "$REPLY" in 
  y|Y ) echo "yes";;
  n|N ) echo "no";;
  *   ) echo "invalid";;
esac


##########################################################

# #! /bin/bash


# myVAR=y

# [[ -t 0 ]] && { read -r -t 5 -n 1 -p $'\e[1;32m >> Continue with dashboard pipeline? (Y/n)\e[0m ' myVAR || myVAR=n ; }

# # Timeout 5 seconds (read -t 5)
# # read 'fails' on timeout and Timeout = said No (|| myVAR=n)

# if [[ $myVAR =~ ^(y|Y)$ ]]  # regex matches (=~) an upper or lower case "Y". between start ^ and end $
# then
#     echo
#     echo said yes!
# fi

# if [[ $myVAR =~ ^(n|N|)$ ]]  # regex matches (=~) an upper or lower case "N" or nothing. between start ^ and end $
# then
#     echo
#     echo said no, or said nothing!
# fi

# echo
# echo rest of file!

##########################################################


# [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell


##########################################################



# # Yes No Dialog box with size 25x6 characters
# #!/bin/bash
# if (dialog --title "Message" --yesno "Want to do something risky?" 6 25)
# then
#     echo "Let's do something risky"
#     # do something risky
# else
#     echo "Let's stay boring"
# fi
