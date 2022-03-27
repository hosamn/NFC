#! /bin/bash

# This script joins CSV files exported by exporter.sh from the NFS60 System.


for i in ~/export_2022*
  do
    # this loops on each export folder
    echo
    echo
    echo Processing folder : "$i"
    echo

    # now to loop on the contents of a single folder:

    cd "$i" || return


    echo + Joining Sta_Lvl_ Files
    paste -d "," Sta_Lvl_* > _JOIND_Sta_Lvl.csv


    echo + Joining Sta_Dis_ Files
    paste -d "," Sta_Dis_* > _JOIND_Sta_Dis.csv


    echo + Joining Res_Rls_ Files
    paste -d "," Res_Rls_* > _JOIND_Res_Rls.csv


    echo + Joining Res_USLvl_ Files
    paste -d "," Res_USLvl_* > _JOIND_Res_USLvl.csv


    echo + Joining Res_DSLvl_ Files
    paste -d "," Res_DSLvl_* > _JOIND_Res_DSLvl.csv


    echo + Joining Vol_ Files
    paste -d "," Vol_* > _JOIND_Vol.csv


  done

echo
echo + Done!