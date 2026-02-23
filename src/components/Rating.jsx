import React, { useId } from "react";

const steps = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

/* productRating: die Bewertung, die angezeigt werden soll (z. B. 3.7).

Default: 0, falls kein Wert übergeben wird.

readOnly: soll der Nutzer das Rating verändern können? */
const Rating = ({ productRating = 0, readOnly = true }) => {
  // safe Rating
  const safeRating = !productRating ? 0 : productRating;
  const nearestHalf = Math.round(safeRating * 2) / 2;

  const groupName = useId(); // eindeutiger Name pro Component-Instanz

  return (
    <div className="flex justify-start items-center">
      <div className="rating rating-lg rating-half">
        {/* versteckter Input wie bei DaisyUI */}
        <input
          type="radio"
          name={groupName}
          className="rating-hidden"
          readOnly
          disabled
        />

        {steps.map((value, index) => {
          const isHalf1 = value % 1 !== 0; // 0.5, 1.5, 2.5, 3.5,4.5
          const halfClass = isHalf1 ? "mask-half-1" : "mask-half-2";

          return (
            <input
              key={value}
              type="radio"
              name={groupName}
              className={`mask mask-star-2 ${halfClass} bg-secondary`}
              checked={nearestHalf === value}
              readOnly={readOnly}
              disabled={readOnly}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
