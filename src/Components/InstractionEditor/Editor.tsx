import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { useAppDispatch } from '../../store/hook';
import { setContent } from '../../store/slices/editorContentSlice'
import { toast } from 'react-toastify'


export default function CustomEditor({ instructions }: any) {

    const editorRef = useRef<any>(null);
    const dispatch = useAppDispatch()

    const [preprartion, setPreprartion] = React.useState<string>('')

    const log = () => {
        dispatch(setContent({
            content: preprartion
        }))
        toast.info('Preparation Synced')
    };

    const [contentt, setContentt] = React.useState<string>('')

    React.useEffect(() => {
        if (instructions) {
            setContentt(instructions)
        } else {
            setContentt('')
        }
    }, [instructions])

    return (
        <>
            <Editor
                apiKey='your-api-key'
                onInit={(evt, editor) => {
                    editorRef.current = editor
                }}
                initialValue={contentt}
                onChange={(e) => {
                    setPreprartion(e.target.getContent())
                }}
                init={{
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log} className='text-gray-50 bg-blue-500 rounded-sm px-8 py-2.5 mt-4 hover:bg-blue-600'>Save Preparation</button>
        </>
    );
}