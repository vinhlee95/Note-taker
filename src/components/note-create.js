import React, { useState, useEffect } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createNote } from '../graphql/mutations'
import { listNotes } from '../graphql/queries'

function NoteCreate() {
	const [noteList, setNoteList] = useState([])
	const [content, setContent] = useState('')

	useEffect(() => {
		async function getNotes() {
			const res = await API.graphql(graphqlOperation(listNotes))
			setNoteList(res.data.listNotes.items)
		}

		getNotes()
	}, [noteList.length])

	const submitContent = async (e) => {
		e.preventDefault();
		const input = {
			title: "New note",
			content,
		}
		const res = await API.graphql(graphqlOperation(createNote, {input}))
		const newNote = res.data.createNote;
		setNoteList([newNote])
		setContent([''])
	}

	const renderNoteList = () => noteList.map((noteItem) => {
		const { id, title, content } = noteItem

		return(
			<div key={id}>
				<h2>{title}</h2>
				<p>{content}</p>
			</div>
		)
	})

	return(
		<form>
			<input type='text' value={content} onChange={e => setContent(e.target.value)} placeholder='Enter your note' />
			<button type='submit' onClick={submitContent}>Add</button>
			{renderNoteList()}
		</form>
	)
}

export default NoteCreate;