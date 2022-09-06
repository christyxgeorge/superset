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
import React from 'react';
import CountTooltip, { CountTooltipProps } from 'src/components/CountTooltip';

export default {
  title: 'CountTooltip',
  component: CountTooltip,
};

export const InteractiveCountTooltip = (props: CountTooltipProps) => {
  const styles = {
    padding: '100px 0 0 200px',
  };

  return (
    <div style={styles}>
      <CountTooltip {...props} />
    </div>
  );
};

InteractiveCountTooltip.args = {
  label: 'Dashboards',
  items: ['Dashboard 1','Dashboard 2','Dashboard 3'],
};

InteractiveCountTooltip.argTypes = {
  placement: {
    defaultValue: 'top',
    control: {
      type: 'select',
      options: [
        'bottom',
        'left',
        'right',
        'top',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
    },
  },
  trigger: {
    defaultValue: 'hover',
    control: {
      type: 'select',
      options: ['hover', 'click'],
    },
  },
};

InteractiveCountTooltip.story = {
  parameters: {
    knobs: {
      disable: true,
    },
  },
};
