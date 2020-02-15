import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as star, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

function roundHalf(num: number) {
    return Math.round(num * 2) / 2;
}

export const Rating: React.FunctionComponent<{ rating: number }> = ({ rating }) => {
    const roundedRating = roundHalf(rating);

    const stars = [1, 2, 3, 4, 5].map(value => {
        if (value <= roundedRating) {
            return star;
        }

        if ((value - .5) === roundedRating) {
            return halfStar;
        }

        return emptyStar;
    });

    return (
        <span title={`Rating: ${rating}`}>
            {stars.map((star, i) => <FontAwesomeIcon icon={star} key={i} />)}
        </span>
    )
};
