# Install awscli
```bash
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
aws configure
```

## Сreate a EKS cluster with EKSCTL
```bash
eksctl create cluster --name test-cluster --region eu-central-1 
```

## Delete the cluster
```bash
eksctl delete cluster --name test-cluster --region eu-central-1
```