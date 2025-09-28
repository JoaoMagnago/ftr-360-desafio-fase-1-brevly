import { CheckIcon, CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { useDeleteShortLink } from '../hooks/delete-short-link'
import type { ShortLink } from '../types'

const BASE_URL = import.meta.env.VITE_FRONTEND_URL

export const ShortLinkItem = ({ shortLink }: { shortLink: ShortLink }) => {
  const { shortUrl, originalUrl, accessCount } = shortLink

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      setCopied(true)
      await navigator.clipboard.writeText(`${BASE_URL}${shortUrl}`)
      setTimeout(() => setCopied(false), 500)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  const deleteMutation = useDeleteShortLink()

  const handleDelete = () => {
    deleteMutation.mutate({ shortLinkId: shortLink.id })
  }

  return (
    <div key={shortUrl} className="flex items-center justify-between py-4 w-full border-t-1 border-t-gray-200">
      <div className="flex flex-col justify-between">
        <a
          href={`/${shortUrl}`}
          className="text-md-semibold font-(weight:--font-semibold) text-blue-base hover:cursor-pointer"
        >
          brev.ly/{shortUrl}
        </a>
        <span className="text-sm-regular text-gray-500">
          {originalUrl}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-sm-regular text-gray-500">
          {`${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`}
        </span>
        <div className="flex items-center gap-1">
          <button 
            type='button'
            className="flex items-center justify-center p-2 rounded-sm bg-gray-200 border-1 border-transparent hover:cursor-pointer hover:border-blue-base transition-all duration-100"
            onClick={handleCopy}
          >
            {copied ? <CheckIcon color={'var(--color-success)'} /> : <CopyIcon />}
          </button>
          <button 
            type='button'
            className="flex items-center justify-center p-2 rounded-sm bg-gray-200 border-1 border-transparent hover:cursor-pointer hover:border-blue-base transition-all duration-100"
            onClick={handleDelete}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
