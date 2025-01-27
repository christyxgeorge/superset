# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
import unicodedata
import urllib
from typing import Any
from urllib.parse import urlparse

from flask import current_app, request, url_for


def get_url_host(user_friendly: bool = False) -> str:
    if user_friendly:
        return current_app.config["WEBDRIVER_BASEURL_USER_FRIENDLY"]
    return current_app.config["WEBDRIVER_BASEURL"]


def headless_url(path: str, user_friendly: bool = False) -> str:
    if user_friendly:
        # This is to ensure that if the user_friendly URL also has a path, 
        # we use that as prefix
        return get_url_host(user_friendly=user_friendly) + path
    return urllib.parse.urljoin(get_url_host(user_friendly=user_friendly), path)


def get_url_path(view: str, user_friendly: bool = False, **kwargs: Any) -> str:
    with current_app.test_request_context():
        return headless_url(url_for(view, **kwargs), user_friendly=user_friendly)


def modify_url_query(url: str, **kwargs: Any) -> str:
    """
    Replace or add parameters to a URL.
    """
    parts = list(urllib.parse.urlsplit(url))
    params = urllib.parse.parse_qs(parts[3])
    for k, v in kwargs.items():
        if not isinstance(v, list):
            v = [v]
        params[k] = v

    parts[3] = "&".join(
        f"{k}={urllib.parse.quote(str(v[0]))}" for k, v in params.items()
    )
    return urllib.parse.urlunsplit(parts)


def is_safe_url(url: str) -> bool:
    if url.startswith("///"):
        return False
    try:
        ref_url = urlparse(request.host_url)
        test_url = urlparse(url)
    except ValueError:
        return False
    if unicodedata.category(url[0])[0] == "C":
        return False
    if test_url.scheme != ref_url.scheme or ref_url.netloc != test_url.netloc:
        return False
    return True
