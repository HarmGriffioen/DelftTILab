---
layout: default
title: "IMC 2025 Dataset"
permalink: /projects/imc2025-syn-payloads
---

# Anonymized Network Telescope Traffic

The following dataset is part of the work leading to our paper *"Have you SYN What I See? Analyzing TCP SYN Payloads in the Wild"* appearing in the 2026 ACM Internet Measurement Conference (IMC 2025).


## Access to the Data

The dataset is available from the following Zenodo node: [https://zenodo.org/records/22274685](https://zenodo.org/records/22274685)

More details on the dataset can be found there.

#### Anonymization

The dataset contains anonymized traces of scanning traffic targeting our passive network telescope between April 2023 and April 2025.

The following fields have been anonymized:
- `src_ip`: keyed Crypto-PAn prefix-preserving anonymization, i.e. sources originally within the same network will still appear as such
- `dst_ip`: upper two octets have been mapped to `10.N.0.0/16` ranges, where N indicates a different /16 network of the three composing our monitored telescope. The lower two octets have been preserved.
- `payload`: to prevent revealing our telescope's address space through embedded or encoded references to IP addresses within payloads, only md5 hashes of the original data are included, allowing for aggregation and comparison.

The full non-anonymized dataset is only available on request (Please [contact Dario Ferrero](mailto:d.ferrero@tudelft.nl))

## Referencing our work

Paper available [here](https://dl.acm.org/doi/10.1145/3730567.3764498)

```
@inproceedings{10.1145/3730567.3764498,
   author = {Ferrero, Dario and Bassetti, Enrico and Griffioen, Harm and Smaragdakis, Georgios},
   title = {Have you SYN What I See? Analyzing TCP SYN Payloads in the Wild},
   year = {2025},
   isbn = {9798400718601},
   publisher = {Association for Computing Machinery},
   address = {New York, NY, USA},
   url = {https://doi.org/10.1145/3730567.3764498},
   doi = {10.1145/3730567.3764498},
   booktitle = {Proceedings of the 2025 ACM Internet Measurement Conference},
   pages = {928–936},
   numpages = {9},
   keywords = {network telescope, internet scanning},
   location = {USA},
   series = {IMC '25}
}
```
