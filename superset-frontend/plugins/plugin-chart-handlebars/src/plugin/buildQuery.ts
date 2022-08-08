/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { buildQueryContext, QueryFormData } from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  const { timeseries_limit_metric: sort_by_metric, groupby } = formData;
  const order_desc = 'order_desc' in formData ? formData.order_desc : true;

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      ...(sort_by_metric && { orderby: [[sort_by_metric, !order_desc]] }),
      ...(groupby && { groupby }),
    },
  ]);
}
