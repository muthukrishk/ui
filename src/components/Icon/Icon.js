import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
//import icons from '@wfp/icons';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

/**
 * @param {Object} svgData - JSON Object for an SVG icon
 * @returns {ReactElement} Elements/Nodes for SVG
 * @example
 * // Returns SVG elements
 * const svgData = getSvgData('copy-code');
 * svgShapes(svgData);
 */
export function svgShapes(svgData) {
  const svgElements = Object.keys(svgData)
    .filter(key => svgData[key])
    .map(svgProp => {
      const data = svgData[svgProp];

      if (svgProp === 'circles') {
        return data.map((circle, index) => {
          const circleProps = {
            cx: circle.cx,
            cy: circle.cy,
            r: circle.r,
            key: `circle${index}`,
          };

          return <circle {...circleProps} />;
        });
      } else if (svgProp === 'paths') {
        return data.map((path, index) => (
          <path d={path.d} key={`key${index}`} />
        ));
      }

      return '';
    });

  return svgElements;
}

export function isPrefixed(name) {
  if (__DEV__) {
    invariant(typeof name === 'string', '[Icon] icon name is missing.');
  }
  return name && name.split('--')[0] === 'icon';
}

const Icon = ({
  className,
  description,
  fill,
  fillRule,
  height,
  icon,
  role,
  style,
  width,
  iconRef,
  ...other
}) => {
  const props = {
    className,
    fill,
    fillRule,
    height: height || icon.height,
    //name: isPrefixed ? name : `icon--${name}`,
    role,
    style,
    viewBox: icon.viewBox,
    width: width || icon.width,
    ref: iconRef,
    ...other,
  };

  const svgContent = icon ? svgShapes(icon.svgData) : '';

  return (
    <svg {...props} aria-label={description} alt={description}>
      <title>{description}</title>
      {svgContent}
    </svg>
  );
};

Icon.propTypes = {
  /**
   * The CSS class name.
   */
  className: PropTypes.string,

  /**
   * The icon description.
   */
  description: PropTypes.string.isRequired,

  /**
   * The `<svg>` `fill` attribute.
   */
  fill: PropTypes.string,

  /**
   * The `<svg>` `fillRule` attribute.
   */
  fillRule: PropTypes.string,

  /**
   * The `<svg>` `height` attribute.
   */
  height: PropTypes.string,

  ...isRequiredOneOf({
    /**
     * The icon data.
     */
    icon: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),

    /**
     * The name in the sprite.
     */
    name: PropTypes.string,
  }),

  /**
   * The `role` attribute.
   */
  role: PropTypes.string,

  /**
   * The CSS styles.
   */
  style: PropTypes.object,

  /**
   * The `<svg>` `viewbox` attribute.
   */
  viewBox: PropTypes.string,

  /**
   * The `<svg>` `width` attribute.
   */
  width: PropTypes.string,

  /**
   * The `ref` callback for the icon.
   */
  iconRef: PropTypes.func,
};

Icon.defaultProps = {
  fillRule: 'evenodd',
  role: 'img',
  description: 'Provide a description that will be used as the title',
};

//export { icons };
export default Icon;
