#!/usr/bin/env bash

wrk -t12 -c100 -d10 http://127.0.0.1:8080/test

# Running 10s test @ http://127.0.0.1:8080/test
#   12 threads and 100 connections
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency    32.39ms    6.78ms 118.63ms   91.65%
#     Req/Sec   249.23     44.70   323.00     71.51%
#   29959 requests in 10.10s, 4.91MB read
# Requests/sec:   2967.21
# Transfer/sec:    498.13KB

# Running 10s test @ http://127.0.0.1:8080/test
#   12 threads and 100 connections
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency    26.43ms    2.11ms  51.75ms   91.20%
#     Req/Sec   303.64     28.91   400.00     81.00%
#   36438 requests in 10.06s, 5.94MB read
# Requests/sec:   3623.21
# Transfer/sec:    605.05KB

# Running 10s test @ http://127.0.0.1:8080/test
#   12 threads and 100 connections
#   Thread Stats   Avg      Stdev     Max   +/- Stdev
#     Latency    12.41ms    4.39ms  81.26ms   97.26%
#     Req/Sec   660.32     95.26     1.21k    89.00%
#   79381 requests in 10.08s, 12.95MB read
# Requests/sec:   7873.79
# Transfer/sec:      1.28MB