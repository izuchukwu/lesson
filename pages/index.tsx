import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {EmojiFavi} from './components/EmojiFavi'
import {LessonWriter} from './components/LessonWriter'
import {LessonViewer, Lesson} from './components/LessonViewer'
import {Group, Stack, Divider, Text, Center} from '@mantine/core'
import {useCallback, useEffect, useState} from 'react'
import {usePrompt} from './components/everyprompt'

const Home: NextPage = () => {
	const [input, setInput] = useState('')
	const [level, setLevel] = useState('novice')
	const [topic, setTopic] = useState('NCLEX')

	const {completion, duration, error, isLoading, setVariables} =
		usePrompt('lesson')

	const [lesson, setLesson] = useState<Lesson | undefined>()

	/** Run Prompt on Writer Change Effect */
	const onGo = useCallback(
		() =>
			setVariables({
				overview: input,
				level,
				topic
			}),
		[input, level, setVariables, topic]
	)

	/** Create Lesson on New Completion Effect */
	useEffect(() => {
		if (!completion) return
		// TODO: Fix JSON
		const completionJSON = JSON.parse(completion)
		setLesson({
			title: completionJSON.title,
			sections: completionJSON.lectureSections.map((section: any) => ({
				name: section.name,
				lecture: section['2paragraphLecture']
			})),
			questions: completionJSON['5uniqueDifficultComplexLessonQuestions']
		})
	}, [completion])

	return (
		<div className={styles.container}>
			<Head>
				<title>Lesson</title>
				<meta name="description" content="Magically make lessons" />
				<EmojiFavi emoji="📕" />
			</Head>

			<Group sx={{gap: 0, height: '100vh'}} align="flex-start">
				{/* sx={{width: 1}} makes flex-grow split equally */}
				<Stack
					sx={{
						flexGrow: 1,
						padding: '2rem',
						width: 1,
						height: '100%'
					}}
				>
					<LessonWriter
						level={level}
						topic={topic}
						input={input}
						onLevelChange={setLevel}
						onTopicChange={setTopic}
						onInputChange={setInput}
						onGo={onGo}
					/>
				</Stack>
				<Divider orientation="vertical" />
				<Stack
					sx={{
						flexGrow: 1,
						padding: '2rem',
						width: 1,
						height: '100%',
						overflowY: 'scroll',
						position: 'relative'
					}}
				>
					<LessonViewer
						isLoading={isLoading}
						lesson={lesson}
						error={error}
						duration={duration}
					/>
				</Stack>
			</Group>
		</div>
	)
}

export default Home

/* -- Helpers -- */

const sampleLesson = {
	title: 'Hypothyroidism',
	sections: [
		{
			name: 'Description',
			lecture:
				"Hypothyroidism is a condition in which the thyroid gland doesn't produce enough thyroid hormone. This hormone helps regulate metabolism — the process by which your body converts what you eat and drink into energy. In hypothyroidism, metabolism slows down.\n\nThe most common cause of hypothyroidism is an autoimmune disorder known as Hashimoto's disease. With Hashimoto's disease, your immune system attacks your thyroid gland. This can lead to a goiter, which is an enlargement of your thyroid gland."
		},
		{
			name: 'Assessment findings of Hypothyroidism',
			lecture:
				'Hypothyroidism can develop slowly over several years. In some cases, though, it can occur suddenly.\n\nSigns and symptoms of hypothyroidism can vary, depending on the severity of the hormone deficiency. But in general, any change in thyroid hormone production, even a small one, can cause a noticeable change in how your body functions.'
		},
		{
			name: 'Nursing Interventions of hypothyroidism',
			lecture:
				'The goal of treatment for hypothyroidism is to restore the normal function of the thyroid gland by giving you the right amount of thyroid hormone replacement.\n\nThe most common treatment for an underactive thyroid is levothyroxine (Levothroid, Levoxyl, Synthroid, Tirosint, Unithroid). This synthetic thyroid hormone is identical to the hormone your thyroid gland normally produces.'
		},
		{
			name: 'Compare hypothyroidism with hyperthyroidism',
			lecture:
				"Hypothyroidism is the opposite of hyperthyroidism, which is an overactive thyroid. With hyperthyroidism, your thyroid gland produces too much thyroid hormone.\n\nThe most common cause of hyperthyroidism is Graves' disease. Graves' disease is an autoimmune disorder that often runs in families. It can also be caused by a benign tumor on the thyroid gland or by taking too much thyroid hormone medication."
		}
	],
	questions: [
		{
			question: 'What is the most common cause of hypothyroidism?',
			answer: "The most common cause of hypothyroidism is an autoimmune disorder known as Hashimoto's disease."
		},
		{
			question:
				'What is the most common treatment for an underactive thyroid?',
			answer: 'The most common treatment for an underactive thyroid is levothyroxine (Levothroid, Levoxyl, Synthroid, Tirosint, Unithroid).'
		},
		{
			question: 'What is the opposite of hypothyroidism?',
			answer: 'The opposite of hypothyroidism is hyperthyroidism.'
		},
		{
			question: 'What is the most common cause of hyperthyroidism?',
			answer: "The most common cause of hyperthyroidism is Graves' disease."
		},
		{
			question: 'What are the signs and symptoms of hypothyroidism?',
			answer: 'Signs and symptoms of hypothyroidism can vary, depending on the severity of the hormone deficiency. But in general, any change in thyroid hormone production, even a small one, can cause a noticeable change in how your body functions.'
		}
	]
}
