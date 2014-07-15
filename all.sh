#!/bin/sh
for a in $(cat all)
do
  ~/ghcntool/stationplot.py -c yscale=30 -c ytick=1 -c legend=none -y -d ~/zontem/input/ghcnm.v3.2.2.20140611/ghcnm.tavg.v3.2.2.20140611.qca.dat $a
  echo $a
done
