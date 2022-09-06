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
import { styled } from '@superset-ui/core';
import { Tooltip } from 'src/components/Tooltip';
import { Avatar } from 'src/components';

export interface CountTooltipProps {
  className?: string;
  tooltip: string;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | undefined;
  trigger?: string | Array<string>;
  overlayStyle?: any;
  bgColor?: string;
  viewBox?: string;
}

const StyledTooltip = styled(Tooltip)`
  cursor: pointer;
  path:first-of-type {
    fill: ${({ theme }) => theme.colors.grayscale.base};
  }
`;

const customAvatarStyler = (theme: SupersetTheme) => `
  width: ${theme.gridUnit * 6}px;
  height: ${theme.gridUnit * 6}px;
  line-height: ${theme.gridUnit * 6}px;
  font-size: ${theme.typography.sizes.m}px;
`;

const StyledAvatar = styled(Avatar)`
  ${({ theme }) => customAvatarStyler(theme)}
`;

const StyledTooltipTitle = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 20;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledHR = styled.hr`
  margin-bottom: 2px;
  margin-top: 2px;
`;

const StyledUL = styled.ul`
  padding-left: 12px;
  margin-bottom: 0px;
`;

const defaultOverlayStyle = {
  fontSize: '12px',
  lineHeight: '16px',
};

const defaultColor = 'rgba(0,0,0,0.9)';

export default function CountTooltip({
  items,
  label,
  placement = 'right',
  trigger = 'hover',
  overlayStyle = defaultOverlayStyle,
  countColor = defaultColor,
  bgColor = defaultColor,
  viewBox = '0 -2 24 24',
}: CountTooltipProps) {
  if (!items || !items.length) { return <></>; }
  return (
    <StyledTooltip
      id="tooltip-count-items"
      title={
        <StyledTooltipTitle>
          {label && (
            <div>
              <div>{label}:</div>
              <StyledHR/>
            </div>
          )}
          <StyledUL>
          {items.map((item)=>{
            return <li key={item.id}>{item.name}</li>
          })}
          </StyledUL>
        </StyledTooltipTitle>}
      placement={placement}
      trigger={trigger}
      overlayStyle={overlayStyle}
      color={bgColor}
    >
      <StyledAvatar
        style={{
          backgroundColor: countColor,
          borderColor: countColor,
        }}
      >
        {items.length}
      </StyledAvatar>
    </StyledTooltip>
  );
}
