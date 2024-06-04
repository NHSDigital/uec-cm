data "aws_s3_bucket" "artefact_bucket" {
  bucket = "nhse-mgmt-uec-cm-artefacts"
}

data "aws_s3_bucket" "released-artefact_bucket" {
  bucket = "nhse-mgmt-uec-cm-artefacts-released"
}
