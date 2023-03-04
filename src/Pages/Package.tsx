import React from 'react'
import { ParentCompProps } from './Dashboard'
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


const Package = ({ title, content }: ParentCompProps) => {
    React.useEffect(() => {
        document.title = title
        document.querySelector('meta[name="description"]')?.setAttribute('content', content)
    }, [content, title])

    const [desc, setDesc] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const handleCreate = () => {
        console.log('desc', desc.trim())
        // get strign which is in ** and end with ** and get all strign which is start with -- and end with --

        // get string which is in `` and wnd with `` with regex

        // get string which is wthin ( and end with ) with regex

        // get string which is wthin [ and end with ] with regex

        // get string which is wthin { and end with } with regex

        // get string which is wthin < and end with > with regex

        const withinBracket = /\(([^)]+)\)/g;

        const regex = /\*\*(.*?)\*\*/g;
        const regex1 = /--(.*?)--/g;
        const regex2 = /``(.*?)``/g;


        const str = desc;

        let m;
        let n;
        let l;
        let p;
        let arr: string[] = []
        let arr1: string[] = []
        let arr2: string[] = []
        let arr3: string[] = []

        while ((p = withinBracket.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (p.index === withinBracket.lastIndex) {
                withinBracket.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            p.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                    arr3.push(match)
                }
            });
        }


        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                    arr.push(match)
                }
            });
        }
        while ((n = regex1.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (n.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            n.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                    arr1.push(match)
                }
            });
        }

        while ((l = regex2.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (l.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            l.forEach((match, groupIndex) => {
                if (groupIndex === 1) {
                    arr2.push(match)
                }
            });
        }

        console.log('arr', arr)
        console.log('arr1', arr1)
        console.log('arr2', arr2)
        console.log('desc', arr3)
    }

    return (
        <div>
            <h1 className='text-gray-700 font-semibold text-2xl'>New Package</h1>
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Info</h2>
                <div className='mt-3 flex gap-8'>
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        // value={search.schoolName}
                        // onChange={(e) => setSearch({ ...search, schoolName: e.target.value })}
                        label="Pacakge Name" variant="outlined"
                        placeholder='Package Title'
                        type='text'
                    />
                    {/* price */}
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        // value={search.schoolName}
                        // onChange={(e) => setSearch({ ...search, schoolName: e.target.value })}
                        label="Pacakge Price" variant="outlined"
                        placeholder='0'
                        type='number'
                    />
                </div>
            </div>
            {/* pacakge duration */}
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Duration</h2>
                <div className='mt-3 flex gap-8'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Year</MenuItem>
                            <MenuItem value={20}>Month</MenuItem>
                            <MenuItem value={30}>Day</MenuItem>
                        </Select>
                    </FormControl>
                    {/* price */}
                    <TextField
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        // value={search.schoolName}
                        // onChange={(e) => setSearch({ ...search, schoolName: e.target.value })}
                        label="Pacakge Price" variant="outlined"
                        placeholder='0'
                        type='number'
                    />
                </div>
            </div>
            <div className='mt-7'>
                <h2 className='text-gray-700 text-sm font-semibold'>Pacakge Description</h2>
                <div className='mt-3 flex gap-8'>
                    {/* price */}
                    <TextareaAutosize
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                        minRows={12}
                        placeholder='Tell something about this package FOR EXAMPLE: for heading use **Heading** for sub heading use --bold--'
                    />
                </div>
            </div>
            <div className='mt-5'>
                {
                    isLoading ? <LinearProgress /> : <Button size='medium'
                        sx={{ paddingX: 7, paddingY: 1.6, background: '#1b356b' }}
                        variant="contained" onClick={handleCreate}>Create</Button>
                }
            </div>
        </div>
    )
}

export default Package