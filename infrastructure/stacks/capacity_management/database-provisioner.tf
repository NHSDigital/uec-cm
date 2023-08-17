resource "null_resource" "data_provisioner_script"{
    provisioner "local_exec"{
        command = <<EOT
            cd ./scripts
            pip install requirements.txt
            python3 database_populator.py
        EOT
    }

    triggers = {
        always_run = timestamp()
    }
}
