import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        eldroW is a game with opposite mechanics of the famous game&nbsp;
        <a href='https://www.powerlanguage.co.uk/wordle/'
          className="underline font-bold">Wordle
        </a>. Hence, the name.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Developed by&nbsp;
        <a
          href="https://www.linkedin.com/in/mohammad-abdallah-81743b148/"
          className="underline font-bold">
          Mohammad Abdallah
        </a>
        &nbsp;with the help of&nbsp;
        <a
          href="https://github.com/hannahcode/GAME"
          className="underline font-bold">
          this Wordle Clone
        </a>
      </p>
    </BaseModal>
  )
}
