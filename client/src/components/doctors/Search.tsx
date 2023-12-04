import { Box, TextField, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, SelectChangeEvent, Chip, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Helper } from "../../services/helper";
import { SearchOutlined } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Search = ({ onSearch }: { onSearch: Function }) => {
    const specialities = Helper.getAllSpecialities();
    const conditions = Helper.getAllConditions();
    const [searchText, setSearchText] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  const handleChange = (e: SelectChangeEvent<typeof selectedSpecialities>) => {
    const {
      target: { name, value },
    } = e;
    name === 'specialities' ? 
        setSelectedSpecialities(typeof value === 'string' ? value.split(',') : value) : 
        setSelectedConditions(typeof value === 'string' ? value.split(',') : value)
  };

  const handleSearch = () => {
    const payload = {
        searchText: searchText,
        ...selectedConditions.length && { conditions: selectedConditions },
        ...selectedSpecialities.length && { specialities: selectedSpecialities }
    }
    onSearch(payload);
  }
    return (
        <Box bgcolor={'#efefef'} p={2} borderRadius={4}>
            <Typography variant="h6" fontWeight={600} mb={2}>Search for doctors</Typography>
            <TextField 
                id="search"
                name="search"
                label="Search for doctors" 
                variant="outlined"
                size="small"
                placeholder="Search for a doctor by name, keyword, specialization or even symptoms" 
                fullWidth
                value={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            />
            <Box mt={3} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems={'center'} columnGap={2}>
                    <FormControl sx={{ width: 250 }} size="small">
                        <InputLabel id="specialities">Speciality</InputLabel>
                        <Select
                            labelId="specialities"
                            id="specialities"
                            multiple
                            name="specialities"
                            value={selectedSpecialities}
                            onChange={(e: SelectChangeEvent<typeof selectedSpecialities>) => handleChange(e)}
                            input={<OutlinedInput label="Speciality" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((item: any) => (
                                        <Chip key={item} label={item} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {specialities.map((speciality: any) => (
                                <MenuItem key={speciality.id} value={speciality.label}>
                                    <Checkbox checked={selectedSpecialities.indexOf(speciality.label) > -1} />
                                    <ListItemText primary={speciality.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: 250 }} size="small">
                        <InputLabel id="specialities">Condition</InputLabel>
                        <Select
                            labelId="conditions"
                            id="conditions"
                            multiple
                            name="conditions"
                            value={selectedConditions}
                            onChange={(e: SelectChangeEvent<typeof selectedConditions>) => handleChange(e)}
                            input={<OutlinedInput label="Condition" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((item: any) => (
                                        <Chip key={item} label={item} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {conditions.map((condition: any) => (
                                <MenuItem key={condition.id} value={condition.label}>
                                    <Checkbox checked={selectedConditions.indexOf(condition.label) > -1} />
                                    <ListItemText primary={condition.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" endIcon={<SearchOutlined />} onClick={handleSearch}>
                    Search
                </Button>
            </Box>
        </Box>
    );
}

export default Search;