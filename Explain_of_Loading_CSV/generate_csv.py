# File: generate_csv.py
# Aim: Generate .csv file using pandas package

import datetime
import numpy as np
import pandas as pd


monthinteger = 4


def get_month_name(idx=0, cutoff=3):
    month = datetime.date(1900, idx, 1).strftime('%B')
    return month[:cutoff]


num = 12
columns = [get_month_name(j+1) for j in range(num)]
names = ['Apple', 'Orange', 'Banana', 'Cherry']

frame = pd.DataFrame()
for _ in names:
    frame = frame.append([np.random.randint(
        10, 20, size=len(columns))],
        ignore_index=True)
frame.columns = columns
frame.index = names
frame.to_csv('table.csv')
print(frame)
