#!/usr/bin/env python

import distutils.dir_util
import distutils.file_util
import os
import sys

from subprocess import call, check_output

root = "fastlane/screenshots/"

for subdir in os.listdir(root):
	subdir = root + subdir + "/"
	if os.path.isdir(subdir):
		for file in os.listdir(subdir):
			if file.endswith(".png"):
				if file.startswith('iPad Pro'):
					height = check_output(["convert", subdir + file, "-format", "%[fx:h]", "info:"])
#					print(subdir + file)
					if height != 2732:
						call(["convert", subdir + file, "-resize", "2048x2732!", subdir + file])
