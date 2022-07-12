import { Box } from "@material-ui/core";
import { LocalHospital, CheckCircle, Work } from "@material-ui/icons";

import { useStateValue } from "../state";
import { Entry } from "../types";

type Props = {
  entry: Entry;
};

const EntryDetails = ({ entry }: Props) => {
  const [{ diagnoses }] = useStateValue();
  let entryIcon;
  switch (entry.type) {
    case "Hospital":
      entryIcon = <LocalHospital />;
      break;
    case "HealthCheck":
      entryIcon = <CheckCircle />;
      break;
    case "OccupationalHealthcare":
      entryIcon = <Work />;
      break;
  }
  return (
    <Box
      sx={{
        border: "1px solid black",
        marginBottom: "1rem",
        padding: "1rem",
        borderRadius: 20,
      }}
      key={entry.id}
    >
      <p>
        {entry.date}
        {entryIcon}
      </p>
      <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code +
              ": " +
              diagnoses?.filter((diagnose) => diagnose.code === code)[0]?.name}
          </li>
        ))}
      </ul>
      <p>Diagnosis by {entry.specialist}</p>
    </Box>
  );
};

export default EntryDetails;
