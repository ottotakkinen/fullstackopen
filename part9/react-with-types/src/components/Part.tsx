import React from 'react';
import { assertNever } from '../utils/helpers';

// interface CoursePart {
//   name: string;
//   exerciseCount: number;
//   type: string;
// }

type PropTypes = {
  part: CoursePart;
};

const Part = ({ part }: PropTypes) => {
  switch (part.type) {
    case 'normal':
      break;
    case 'groupProject':
      break;
    case 'submission':
      break;
    case 'special':
      break;
    default:
      return assertNever(part);
  }
  return (
    <div>
      <p>
        <strong>
          {part.name} {part.exerciseCount}
        </strong>
      </p>
      <i>{part.description}</i>
      {'groupProjectCount' in part && (
        <p>exercies in this part: {part.groupProjectCount}</p>
      )}
      {'exerciseSubmissionLink' in part && <p>{part.exerciseSubmissionLink}</p>}
      {'requirements' in part && (
        <p>required skills: {part.requirements.join(', ')}</p>
      )}
    </div>
  );
};

export default Part;
