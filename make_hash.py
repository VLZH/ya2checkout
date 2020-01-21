# You can use this script for more simply generating Authentication header
# Example: VENDOR_CODE={you code} SECRET_KEY={your secret key} python3 ./make_hash.py

import os
import hashlib, hmac, datetime

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def checkEnv(name):
    val = os.environ.get(name)
    if not val:
        print(f"[error] you must to define {name} through virtual env '{name}'")
        exit(1)


def main():
    VENDOR_CODE = os.environ.get("VENDOR_CODE")
    checkEnv("VENDOR_CODE")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    checkEnv("SECRET_KEY")

    LEN_VENDOR_CODE = str(len(VENDOR_CODE))
    REQUEST_DATE_TIME = datetime.datetime.now(datetime.timezone.utc).strftime(
        DATE_FORMAT
    )
    LEN_REQUEST_DATE_TIME = str(len(REQUEST_DATE_TIME))
    hasher = hmac.new(
        bytes(SECRET_KEY, "utf-8"),
        bytes(
            LEN_VENDOR_CODE + VENDOR_CODE + LEN_REQUEST_DATE_TIME + REQUEST_DATE_TIME,
            "utf-8",
        ),
        digestmod="md5",
    )
    hash_string = hasher.hexdigest()
    print(
        f"""
Vendor code: {VENDOR_CODE}({LEN_VENDOR_CODE})
Request date time: {REQUEST_DATE_TIME}({LEN_REQUEST_DATE_TIME})
Your hash: {hash_string}
"""
    )


if __name__ == "__main__":
    main()
else:
    print("Hey! what do you doing?")
