import boto3
from botocore.client import Config
import StringIO
import zipfile

def lambda_handler(event, context):
    s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

    build_bucket = s3.Bucket('portfoliobuild.paulognr.com')
    portfolio_bucket = s3.Bucket('portfolio.paulognr.com')

    portfolio_zip = StringIO.StringIO()
    build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)

    with zipfile.ZipFile(portfolio_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            portfolio_bucket.upload_fileobj(obj, nm)
            portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

    print "Job done!"

    return 'Hello from Lambda'