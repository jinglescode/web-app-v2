import { useMatch, useNavigate } from '@tanstack/react-location';
import { QuestionsRes } from '../../../../core/types';
import { Button } from '../../../atoms/button/button';
import { Checkbox } from '../../../atoms/checkbox/checkbox';
import { Header } from '../../../atoms/header/header';
import { Input } from '../../../atoms/input/input';
import { Textarea } from '../../../atoms/textarea/textarea';
import { Typography } from '../../../atoms/typography/typography';
import { ProfileView } from '../../../molecules/profile-view/profile-view';
import { RadioGroup } from '../../../molecules/radio-group/radio-group';
import type { RadioGroupProps } from '../../../molecules/radio-group/radio-group.types';
import { Job } from '../../../organisms/job-list/job-list.types';
import { Divider } from '../../../templates/divider/divider';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { jobDetail, screeningQuestions } = useMatch().ownData as {
    jobDetail: Job;
    screeningQuestions: { questions: QuestionsRes[] };
  };

  const questions = screeningQuestions.questions;

  const convertOptionsToRadioGroup = (
    options: QuestionsRes['options']
  ): RadioGroupProps['list'] => {
    return (options as string[]).map((option) => {
      return { label: option, value: option };
    });
  };

  function createRadioQuestion(question: QuestionsRes, i: number): JSX.Element {
    return (
      <RadioGroup
        label={`${i}. ${question.question}`}
        list={convertOptionsToRadioGroup(question.options)}
        value=""
        name="radio"
        onChange={console.log}
      />
    );
  }

  function createTextQuestion(question: QuestionsRes, i: number): JSX.Element {
    return (
      <div>
        <Textarea
          placeholder="Your answer..."
          variant="outline"
          label={`${i}. ${question.question}`}
        />
      </div>
    );
  }

  const renderQuestions = () => {
    return (
      <div className={css.questionsContainer}>
        {questions.map((item, i) => {
          const isMultipleChoice = item.options;
          return (
            <div key={item.id} className={css.questions}>
              {isMultipleChoice
                ? createRadioQuestion(item, i + 1)
                : createTextQuestion(item, i + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  const onBack = () => {
    navigate({ to: '..' });
  };

  return (
    <div className={css.container}>
      <Header onBack={onBack} height="var(--safe-area)" title="Apply" />
      <div className={css.main}>
        <Divider>
          <ProfileView
            img={jobDetail.identity_meta?.image}
            type={jobDetail.identity_type}
            name={jobDetail.identity_meta.name}
            location={jobDetail.identity_meta.city}
          />
          <div className={css.jobTitle}>{jobDetail.title}</div>
          <Typography lineLimit={3}>{jobDetail.description}</Typography>
        </Divider>
        <Divider divider="line" title="Cover letter">
          <Textarea placeholder="write a message..." label="Message" variant="outline" />
        </Divider>
        <Divider divider="line" title="Resume">
          <div className={css.uploadYourResume}>Upload your resume</div>
          <div className={css.acceptedType}>DOC, DOCX, PDF (10MB)</div>
          <Button
            position="relative"
            icon="/icons/attachment.svg"
            width="9.75rem"
            size="s"
            color="white"
          >
            <input type="file" className={css.fileInput} />
            Upload File
          </Button>
        </Divider>
        <Divider divider="line" title="Link">
          <div className={css.linkContainer}>
            <Input variant="outline" placeholder="Link name" label="Link name" />
            <Input placeholder="domain.com" variant="outline" label="Link URL" />
          </div>
        </Divider>
        {questions.length > 0 && (
          <Divider divider="line" title="Screening questions">
            {renderQuestions()}
          </Divider>
        )}
        <Divider divider="line" title="Contact info">
          <div className={css.contactContainer}>
            <div>Share contact information with Organization?</div>
            <Checkbox label="" id="" checked={false} />
          </div>
        </Divider>
        <div className={css.btnContainer}>
          <Button>Submit application</Button>
        </div>
      </div>
    </div>
  );
};