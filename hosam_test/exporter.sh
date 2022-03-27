#! /bin/bash

echo
echo
# This script runs ntable to export Stations\ Reservoirs of NFS60 system daily data to CSV...
echo "+ Exporting daily Station & Reservoir data of NFS60 to CSV..."



# SETUP (Revise/Update):

ntable="/home/forecast/nfs60/bin/ntable"
cd /home/forecast/nfs60/workspaces || return

export_dir_name=export_$( date '+%F_%H:%M:%S' )
export_path="/home/forecast/exports/$export_dir_name"
mkdir -p "$export_path"
export export_path  # making an environment variable for other linked scripts.

echo "+ Exporting to $export_path..."

start_date=19700101
# end_date=20220123
end_date=$( date '+%Y%m%d' )
echo "+ Processing data from $start_date upto today, $end_date:"


option=-P
# -P        Daily Data
# -C -T     Comulative Decadal Data
# -C -M     Comulative Monthly Data
# -C -Y     Comulative Yearly Data
# -F        Added to any other option gives the First day of each "month/..."


# data files:
dailylevels="/home/forecast/nfs60/workspaces/NBHIS/dflow/dl.bts"
dailydischarges="/home/forecast/nfs60/workspaces/NBHIS/dflow/dd.bts"
dailyreleases="/home/forecast/nfs60/workspaces/NBHIS/dflow/rel.bts"
dailyreslevels="/home/forecast/nfs60/workspaces/NBHIS/dflow/res.bts"
dailyvolumes="/home/forecast/nfs60/workspaces/NBHIS/dflow/dv.bts"



# Exporting data to DAT files:

# Daily Levels
echo "+     - Station Observed Daily Levels.."
$ntable $option $start_date "$end_date" "$dailylevels" AtNile > "$export_path/Lvl_Sta_AtNile"
$ntable $option $start_date "$end_date" "$dailylevels" Atbara > "$export_path/Lvl_Sta_Atbara"
$ntable $option $start_date "$end_date" "$dailylevels" Diem > "$export_path/Lvl_Sta_Diem"
$ntable $option $start_date "$end_date" "$dailylevels" Dongala > "$export_path/Lvl_Sta_Dongala"
$ntable $option $start_date "$end_date" "$dailylevels" KharBlue > "$export_path/Lvl_Sta_KharBlue"
$ntable $option $start_date "$end_date" "$dailylevels" Malakal > "$export_path/Lvl_Sta_Malakal"
$ntable $option $start_date "$end_date" "$dailylevels" Roseires > "$export_path/Lvl_Sta_Roseires"

# Daily Discharge
echo "+     - Station Calculated Daily Discharge.."
$ntable $option $start_date "$end_date" "$dailydischarges" Atbara > "$export_path/Dis_Sta_Atbara"
$ntable $option $start_date "$end_date" "$dailydischarges" Diem > "$export_path/Dis_Sta_Diem"
$ntable $option $start_date "$end_date" "$dailydischarges" Dongala > "$export_path/Dis_Sta_Dongala"
$ntable $option $start_date "$end_date" "$dailydischarges" HighDam > "$export_path/Dis_Sta_HighDam"
$ntable $option $start_date "$end_date" "$dailydischarges" KharBlue > "$export_path/Dis_Sta_KharBlue"
$ntable $option $start_date "$end_date" "$dailydischarges" Malakal > "$export_path/Dis_Sta_Malakal"
$ntable $option $start_date "$end_date" "$dailydischarges" Roseires > "$export_path/Dis_Sta_Roseires"
$ntable $option $start_date "$end_date" "$dailydischarges" Sennar > "$export_path/Dis_Sta_Sennar"
$ntable $option $start_date "$end_date" "$dailydischarges" Gabel > "$export_path/Dis_Sta_Gabel"
$ntable $option $start_date "$end_date" "$dailydischarges" Khashn > "$export_path/Dis_Sta_Khashn"

# Daily Reservoir Releases
echo "+     - Reservoir Observed Daily Releases.."
$ntable $option $start_date "$end_date" "$dailyreleases" Gabel > "$export_path/Rle_Res_Gabel"
$ntable $option $start_date "$end_date" "$dailyreleases" HighDam > "$export_path/Rle_Res_HighDam"
$ntable $option $start_date "$end_date" "$dailyreleases" Khashn > "$export_path/Rle_Res_Khashn"
$ntable $option $start_date "$end_date" "$dailyreleases" Roseires > "$export_path/Rle_Res_Roseires"
$ntable $option $start_date "$end_date" "$dailyreleases" Sennar > "$export_path/Rle_Res_Sennar"

# Daily Reservoir Levels
echo "+     - Reservoir Observed Daily Levels.."
$ntable $option $start_date "$end_date" "$dailyreslevels" Gabel > "$export_path/USL_Res_Gabel"
$ntable $option $start_date "$end_date" "$dailyreslevels" Gabel_dw > "$export_path/DSL_Res_Gabel"
$ntable $option $start_date "$end_date" "$dailyreslevels" HighDam > "$export_path/USL_Res_HighDam"
$ntable $option $start_date "$end_date" "$dailyreslevels" Khashn > "$export_path/USL_Res_Khashn"
$ntable $option $start_date "$end_date" "$dailyreslevels" Roseires > "$export_path/USL_Res_Roseires"
$ntable $option $start_date "$end_date" "$dailyreslevels" Sennar > "$export_path/USL_Res_Sennar"

# Daily Volumes
echo "+     - Calculated Daily Volumes.."
$ntable $option $start_date "$end_date" "$dailyvolumes" Atbara > "$export_path/Vol_Atbara"
$ntable $option $start_date "$end_date" "$dailyvolumes" Diem > "$export_path/Vol_Diem"
$ntable $option $start_date "$end_date" "$dailyvolumes" Dongala > "$export_path/Vol_Dongala"
$ntable $option $start_date "$end_date" "$dailyvolumes" KharBlue > "$export_path/Vol_KharBlue"
$ntable $option $start_date "$end_date" "$dailyvolumes" Malakal > "$export_path/Vol_Malakal"
$ntable $option $start_date "$end_date" "$dailyvolumes" Roseires > "$export_path/Vol_Roseires"
$ntable $option $start_date "$end_date" "$dailyvolumes" Sennar > "$export_path/Vol_Sennar"
$ntable $option $start_date "$end_date" "$dailyvolumes" Gabel > "$export_path/Vol_Gabel"



# Converting DAT files to CSV:
echo "+ Converting DAT to CSV..."

for i in "$export_path"/*
  do
    sed -i -e 's/ //g' "$i";       # Deleting all spaces
    sed -i -e 's/\t//g' "$i";      # Deleting all tabs
    sed -i 's/./&,/8' "$i";        # Adding "," after 4th postion
    sed -i -e 's/-//g' "$i";       # Removing all "-"
  done


# Adding Headers:
echo "+ Adding File Headers & Extensions..."

for i in "$export_path"/*
  do
    # Adding CSV headers
    fnbase=$( basename "$i" )
    echo Date,"$fnbase" > "$i".csv
    cat  "$i" >> "$i".csv
    rm "$i"
  done



# echo ">> Continue with dashboard pipeline?"

read -r -t 3 -n 1 -p ">> Continue with dashboard pipeline?"
case "$REPLY" in 
  y|Y|"" ) echo ;;    # accepts Y, y, or enter!
  *      ) echo; echo "+ No?! OK, skipping the rest..."; echo "+ I'm Done Exporting!"; echo; exit 1;;
esac



# Copying files for the dashboard:
echo "+ Readying Dashboard Files..."

mkdir -p "$export_path/dash/"

cp "$export_path/Dis_Sta_Atbara.csv"     "$export_path/dash/Dis_atb"
cp "$export_path/Dis_Sta_Diem.csv"       "$export_path/dash/Dis_dim"
cp "$export_path/Dis_Sta_Dongala.csv"    "$export_path/dash/Dis_don"
cp "$export_path/Dis_Sta_Gabel.csv"      "$export_path/dash/Dis_gab"
cp "$export_path/Dis_Sta_HighDam.csv"    "$export_path/dash/Dis_had"
cp "$export_path/Dis_Sta_KharBlue.csv"   "$export_path/dash/Dis_khr"
cp "$export_path/Dis_Sta_Malakal.csv"    "$export_path/dash/Dis_mlk"
cp "$export_path/Dis_Sta_Roseires.csv"   "$export_path/dash/Dis_ros"
cp "$export_path/Dis_Sta_Sennar.csv"     "$export_path/dash/Dis_sen"
cp "$export_path/Lvl_Sta_Atbara.csv"     "$export_path/dash/Lvl_atb"
cp "$export_path/Lvl_Sta_Diem.csv"       "$export_path/dash/Lvl_dim"
cp "$export_path/Lvl_Sta_Dongala.csv"    "$export_path/dash/Lvl_don"
cp "$export_path/Lvl_Sta_KharBlue.csv"   "$export_path/dash/Lvl_khr"
cp "$export_path/Lvl_Sta_Malakal.csv"    "$export_path/dash/Lvl_mlk"
cp "$export_path/Rle_Res_Gabel.csv"      "$export_path/dash/Rle_gab"
cp "$export_path/Rle_Res_HighDam.csv"    "$export_path/dash/Rle_had"
cp "$export_path/Rle_Res_Roseires.csv"   "$export_path/dash/Rle_ros"
cp "$export_path/Rle_Res_Sennar.csv"     "$export_path/dash/Rle_sen"
cp "$export_path/USL_Res_Gabel.csv"      "$export_path/dash/Lvl_gab"
cp "$export_path/USL_Res_HighDam.csv"    "$export_path/dash/Lvl_had"
cp "$export_path/USL_Res_Roseires.csv"   "$export_path/dash/Lvl_ros"
cp "$export_path/USL_Res_Sennar.csv"     "$export_path/dash/Lvl_sen"
cp "$export_path/Vol_Atbara.csv"         "$export_path/dash/Vol_atb"
cp "$export_path/Vol_Diem.csv"           "$export_path/dash/Vol_dim"
cp "$export_path/Vol_Dongala.csv"        "$export_path/dash/Vol_don"
cp "$export_path/Vol_Gabel.csv"          "$export_path/dash/Vol_gab"
cp "$export_path/Vol_KharBlue.csv"       "$export_path/dash/Vol_khr"
cp "$export_path/Vol_Malakal.csv"        "$export_path/dash/Vol_mlk"
cp "$export_path/Vol_Roseires.csv"       "$export_path/dash/Vol_ros"
cp "$export_path/Vol_Sennar.csv"         "$export_path/dash/Vol_sen"



# Encoding Dashboard Files 
echo "+ Encoding Dashboard Files..."
# test=$( base64 DSC_0251.JPG )


# Uploading Dashboard Files to the server
echo "+ Uploading Dashboard Files..."
# scp "$export_path/dash/" "C:\Users\A\Desktop\NFC Dashboard Website\data"

echo "+ I'm Done, Pipeline Completed!"
echo
