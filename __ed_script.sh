#!/bin/bash

cd '/usercode'

sh -c "echo \"hello\"" >> '/usercode/__ed_stdout.txt' 2>> '/usercode/__ed_stderr.txt'
exit 0