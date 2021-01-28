import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import Box from "@material-ui/core/Box";
import { DATA_VIEW_MODES } from "../../components/constants/constantsTable";

export default function ToggleViewMode({ dataViewMode, setDataViewMode }) {
  const handleChangeDataViewMode = useCallback(
    (_, nextView) => {
      setDataViewMode(nextView);
    },
    [setDataViewMode]
  );

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3" component="h1">
          Contacts
        </Typography>
        <ToggleButtonGroup
          value={dataViewMode}
          exclusive
          onChange={handleChangeDataViewMode}
        >
          <ToggleButton
            value={DATA_VIEW_MODES.TABLE}
            aria-label={DATA_VIEW_MODES.TABLE}
            data-testid="toggle-data-view-mode-table"
          >
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton
            value={DATA_VIEW_MODES.GRID}
            aria-label={DATA_VIEW_MODES.GRID}
            data-testid="toggle-data-view-mode-grid"
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
}

ToggleViewMode.propTypes = {
  dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.GRID, DATA_VIEW_MODES.TABLE]),
};
