<template>
  <div
    class="the-editor"
    :style="{
      '--min-height': minHeight,
      '--editor-height': autoResize ? 'auto' : minHeight,
    }"
  >
    <textarea :id="editorId" :placeholder="placeholder" :disabled="disabled"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import tinymce from 'tinymce/tinymce'
import { useI18n } from 'vue-i18n'
import { uploadService } from '@/services/upload.service'

import 'tinymce/skins/ui/oxide/skin.min.css'

import 'tinymce/icons/default'
import 'tinymce/themes/silver'
import 'tinymce/models/dom/model'

import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autoresize'

import 'tinymce/plugins/emoticons/js/emojis'

defineOptions({
  name: 'TheEditor',
})

const props = defineProps({
  minHeight: { type: String, default: '200px' },
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  autoResize: { type: Boolean, default: true },

  minimal: { type: Boolean, default: false },
  toolbar: { type: String, default: null },
  menubar: {
    type: [Boolean, String],
    default: 'edit view insert format tools table help',
  },
})

interface BlobInfo {
  blob: () => Blob;
  filename: () => string;
}

const emit = defineEmits(['update:modelValue', 'blur', 'paste'])

const { t } = useI18n()
const editorId = ref(`editor-${Math.random().toString(36).substring(2, 11)}`)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let editor: any = null // TinyMCE editor instance
let isInternalUpdate = false
let tooltipHideTimeout: ReturnType<typeof setTimeout> | null = null

// Computed properties for CSS binding
const autoResize = computed(() => props.autoResize)

const convertToPixels = (value: string | number): number => {
  if (!value) return 200

  if (typeof value === 'number') return value

  if (value.endsWith('px')) {
    return Number.parseInt(value) || 200
  }

  if (value.endsWith('rem')) {
    const remValue = Number.parseFloat(value)
    return remValue * 16
  }

  const parsed = Number.parseInt(value)
  return Number.isNaN(parsed) ? 200 : parsed
}

const editorConfig = computed(() => {
  const basePlugins = [
    'anchor',
    'autolink',
    'charmap',
    'code',
    'emoticons',
    'image',
    'link',
    'lists',
    'searchreplace',
    'table',
    'visualblocks',
    'wordcount',
  ]

  let toolbarValue
  if (props.toolbar) {
    toolbarValue = props.toolbar
  } else if (props.minimal) {
    toolbarValue = 'bold underline'
  } else {
    toolbarValue = [
      'undo redo | blocks fontsize | bold italic |',
      'underline strikethrough | link | image | table | forecolor backcolor | ',
      'removeformat |  bullist numlist |',
      'alignleft aligncenter alignright alignjustify | outdent indent',
      'charmap | emoticons | code',
    ].join(' | ')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = {
    license_key: 'gpl',
    selector: `#${editorId.value}`,
    min_height: convertToPixels(props.minHeight),
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: '/tinymce/skins/content/default/content.css',
    language: 'en',

    menubar: props.minimal ? false : props.menubar,

    toolbar: toolbarValue,

    plugins: (() => {
      if (props.minimal) {
        return props.autoResize ? ['autoresize'] : []
      } else {
        return props.autoResize ? [...basePlugins, 'autoresize'] : basePlugins
      }
    })(),

    quickbars_selection_toolbar: 'bold italic | formatselect',
    quickbars_insert_toolbar: false,

    auto_focus: true,
    branding: false,
    promotion: false,
    statusbar: false,
    
    // Sticky toolbar settings
    sticky_toolbar: true,
    sticky_toolbar_offset: 0, // Adjust this if there's a top navbar

    content_style: `
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
        font-size: 14px;
        line-height: 1.5;
        margin: 0;
        padding: 20px;
        outline: none !important;
      }
      body:focus {
        outline: none !important;
        border: none !important;
      }
      p {
        margin: 0 0 12px 0;
        line-height: 1.5;
      }
      h1, h2, h3, h4, h5, h6 {
        margin-top: 24px;
        margin-bottom: 12px;
        font-weight: 700;
        line-height: 1.3;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
      }
      table td, table th {
        border: 1px solid #e2e8f0;
        padding: 10px;
      }
      table th {
        background-color: #f8fafc;
        font-weight: bold;
      }
      img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 10px 0;
      }
    `,

    image_advtab: false,
    image_caption: false,
  }

  // Add conditional configuration
  if (props.autoResize) {
    config.autoresize_bottom_margin = 20
    config.autoresize_overflow_padding = 20
    config.autoresize_on_init = true
    config.resize = false
  } else {
    config.height = convertToPixels(props.minHeight)
    config.resize = true
  }

  // Add remaining configuration
  config.image_description = false
  config.image_title = false

  config.automatic_uploads = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config.images_upload_handler = (blobInfo: BlobInfo, _progress: (percent: number) => void) => new Promise((resolve, reject) => {
    uploadService.uploadImage(blobInfo.blob())
      .then((res) => {
        if ('data' in res && res.data?.location) {
          resolve(res.data.location)
        } else if ('message' in res) {
          reject(res.message)
        } else {
          reject('Image upload failed')
        }
      })
      .catch((err) => {
        reject(err.message || 'Unknown error occurred during upload')
      })
  })

  config.convert_urls = false
  config.relative_urls = false
  config.remove_script_host = false

  config.link_default_target = '_blank'
  config.link_assume_external_targets = true

  // Hide unwanted fields in link dialog
  config.link_title = false
  config.link_target_list = false

  config.table_toolbar =
    'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'
  config.table_appearance_options = false
  config.table_advtab = false
  config.table_cell_advtab = false
  config.table_row_advtab = false

  const updateLabels = (dialog: Element, selector: string, matchText: string, newText: string) => {
    dialog.querySelectorAll(selector).forEach((label: Element) => {
      if (label.textContent?.includes(matchText)) {
        label.textContent = newText
      }
    })
  }

  const hideLockIcon = (icon: Element | null) => {
    if (icon) {
      const el = icon as HTMLElement
      el.style.display = 'none'
      if (el.parentElement && el.parentElement.classList.contains('tox-button')) {
        el.parentElement.style.display = 'none'
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config.setup = (ed: Record<string, any>) => {
    editor = ed

    ed.on('init', () => {
      const iframe = ed.getContainer().querySelector('iframe')
      if (iframe) {
        const mousePos = { x: 0, y: 0 }

        // Track mouse position
        if (iframe.contentDocument) {
          iframe.contentDocument.addEventListener('mousemove', (e: MouseEvent) =>
            handleMouseMove(e, mousePos),
          )

          iframe.contentDocument.addEventListener('mouseover', (e: MouseEvent) =>
            handleMouseOver(e, iframe, mousePos),
          )

          iframe.contentDocument.addEventListener('mouseout', (e: MouseEvent) => handleMouseOut(e))
        }
      }
    })

    // Override dialog titles and labels for multilingual support

    ed.on('OpenWindow', (_e: unknown) => {
      void _e
      setTimeout(() => {
        const dialog = document.querySelector('.tox-dialog')
        if (!dialog) return

        updateLabels(
          dialog,
          '.tox-dialog__title',
          'Insert/Edit Image',
          t('EDITOR.INSERT_EDIT_IMAGE'),
        )
        updateLabels(
          dialog,
          '.tox-dialog__title',
          'Insert/Edit Link',
          t('EDITOR.INSERT_EDIT_LINK'),
        )

        updateLabels(dialog, '.tox-label', 'Source', t('EDITOR.SOURCE'))
        updateLabels(dialog, '.tox-label', 'Height', t('EDITOR.HEIGHT'))
        updateLabels(dialog, '.tox-label', 'Width', t('EDITOR.WIDTH'))
        updateLabels(dialog, '.tox-label', 'URL', t('EDITOR.URL'))
        updateLabels(dialog, '.tox-label', 'Text to display', t('EDITOR.TEXT_TO_DISPLAY'))

        // Hide lock icon (constrain proportions)
        dialog
          .querySelectorAll(
            '.tox-lock, .tox-icon-lock, button[aria-pressed], .tox-button--icon-and-text',
          )
          .forEach(hideLockIcon)
      }, 100)
    })

    ed.on('input change undo redo', () => {
      isInternalUpdate = true
      emit('update:modelValue', ed.getContent())
      setTimeout(() => {
        isInternalUpdate = false
      }, 0)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ed.on('blur', (e: any) => {
      emit('blur', e)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ed.on('paste', (e: any) => {
      emit('paste', e)
    })
  }

  config.disabled = props.disabled

  return config
})

onMounted(() => {
  tinymce.init(editorConfig.value).then((editors) => {
    editor = editors[0]
    if (props.modelValue) {
      editor.setContent(props.modelValue)
    }
  })
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && editor.initialized && !isInternalUpdate) {
      try {
        const currentContent = editor.getContent()

        if (currentContent !== (newValue || '')) {
          const bookmark = editor.selection?.getBookmark(2, true)

          editor.setContent(newValue || '')

          try {
            if (bookmark && editor.selection) {
              editor.selection.moveToBookmark(bookmark)
            }
          } catch (e) {
            console.error(e)
          }
        }
      } catch (e) {
        console.warn('TinyMCE update error:', e)
        // Fallback for not-fully-initialized state
        editor.setContent(newValue || '')
      }
    }
  },
)

onBeforeUnmount(() => {
  hideLinkTooltip() // Clean up tooltip
  if (tooltipHideTimeout) {
    clearTimeout(tooltipHideTimeout)
  }
  if (editor) {
    tinymce.remove(editor)
    editor = null
  }
})

// Tooltip functions for link hover
let tooltipElement: HTMLElement | null = null

function handleMouseMove(e: MouseEvent, mousePos: { x: number; y: number }) {
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

function handleMouseOver(
  e: MouseEvent,
  iframe: HTMLIFrameElement,
  mousePos: { x: number; y: number },
) {
  const target = e.target as HTMLElement
  const link = target.closest('a[href], a[data-mce-href]') as HTMLAnchorElement | null
  if (link && (link.href || link.dataset.mceHref)) {
    if (tooltipHideTimeout) clearTimeout(tooltipHideTimeout)
    showLinkTooltip(link, e, iframe, mousePos.x, mousePos.y)
  }
}

function handleMouseOut(e: MouseEvent) {
  const target = e.target as HTMLElement
  const link = target.closest('a[href]')
  if (link) {
    tooltipHideTimeout = setTimeout(() => {
      hideLinkTooltip()
    }, 200)
  }
}

const matchByTextContent = (links: NodeListOf<Element> | Element[], text: string) =>
  Array.from(links).find((linkEl) => linkEl.textContent === text)

const matchByDataMceSelected = (links: NodeListOf<Element> | Element[], dataMceSelected: string) =>
  Array.from(links).find(
    (linkEl) => (linkEl as HTMLElement).dataset.mceSelected === dataMceSelected,
  )

const matchByHrefAttributes = (
  links: NodeListOf<Element> | Element[],
  hrefAttr: string | null,
  dataMceHref: string | null | undefined,
) =>
  Array.from(links).find((linkEl) => {
    const el = linkEl as HTMLElement
    const linkHref = el.getAttribute('href')
    const linkDataMceHref = el.dataset.mceHref
    return (
      linkHref === hrefAttr ||
      linkDataMceHref === dataMceHref ||
      linkHref === (dataMceHref as string) ||
      linkDataMceHref === hrefAttr ||
      (linkDataMceHref && linkDataMceHref === hrefAttr)
    )
  })

const matchBySimilarText = (links: NodeListOf<Element> | Element[], text: string) =>
  Array.from(links).find((linkEl) => linkEl.textContent?.includes(text.substring(0, 20)))

const showLinkTooltip = (
  link: HTMLAnchorElement,
  _event: MouseEvent,
  iframe: HTMLIFrameElement,
  mouseX: number,
  mouseY: number,
) => {
  hideLinkTooltip() // Remove existing tooltip

  if (!iframe) return

  const iframeRect = iframe.getBoundingClientRect()

  // Create tooltip element
  tooltipElement = document.createElement('div')
  tooltipElement.className = 'link-tooltip'
  tooltipElement.innerHTML = `
    <div class="tooltip-content">
      <div class="tooltip-actions">
        <button class="tooltip-btn edit-btn" title="Edit link">
          <i class="fas fa-edit"></i>
        </button>
        <button class="tooltip-btn open-btn" title="Open link in new tab">
          <i class="fas fa-external-link-alt"></i>
        </button>
        <button class="tooltip-btn copy-btn" title="Copy link">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    </div>
  `

  // Position tooltip near mouse cursor
  let x = iframeRect.left + mouseX + 10 // 10px offset from cursor
  let y = iframeRect.top + mouseY + 10 // 10px offset from cursor

  // Ensure tooltip doesn't go off screen
  const tooltipWidth = 200 // Approximate tooltip width
  const tooltipHeight = 60 // Approximate tooltip height
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight

  // Adjust X position if tooltip would go off right edge
  if (x + tooltipWidth > screenWidth) {
    x = screenWidth - tooltipWidth - 10
  }

  // Adjust Y position if tooltip would go off bottom edge
  if (y + tooltipHeight > screenHeight) {
    y = iframeRect.top + mouseY - tooltipHeight - 10 // Show above cursor
  }

  tooltipElement.style.position = 'fixed'
  tooltipElement.style.left = `${x}px`
  tooltipElement.style.top = `${y}px`
  tooltipElement.style.zIndex = '9999'

  document.body.appendChild(tooltipElement)

  // Add click handlers for all buttons
  const editBtn = tooltipElement.querySelector('.edit-btn')
  const openBtn = tooltipElement.querySelector('.open-btn')
  const helpBtn = tooltipElement.querySelector('.help-btn')
  const copyBtn = tooltipElement.querySelector('.copy-btn')
  const settingsBtn = tooltipElement.querySelector('.settings-btn')

  if (editBtn) {
    editBtn.addEventListener('click', (e) => {
      e.preventDefault()
      // Store reference to the current link with all its attributes
      const currentLink = {
        element: link,
        href: link.href,
        dataMceHref: link.dataset.mceHref,
        textContent: link.textContent,
        hrefAttr: link.getAttribute('href'),
        dataMceSelected: link.dataset.mceSelected,
      }

      // Use setTimeout to ensure the selection happens after tooltip is hidden
      setTimeout(() => {
        const iframe = editor.getContainer().querySelector('iframe')
        if (iframe && iframe.contentDocument) {
          const iframeDoc = iframe.contentDocument
          const allLinks = iframeDoc.querySelectorAll('a[href], a[data-mce-href]')

          const targetLink =
            matchByTextContent(allLinks, currentLink.textContent || '') ||
            matchByDataMceSelected(allLinks, currentLink.dataMceSelected || '') ||
            matchByHrefAttributes(allLinks, currentLink.hrefAttr, currentLink.dataMceHref) ||
            (allLinks.length > 0 &&
              (matchBySimilarText(allLinks, currentLink.textContent || '') || allLinks[0]))

          if (targetLink) {
            const range = iframeDoc.createRange()
            range.selectNode(targetLink)
            const selection = iframeDoc.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            editor.execCommand('mceLink')
          }
        }
      }, 50)

      hideLinkTooltip()
    })
  }

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const linkUrl = link.dataset.mceHref || link.getAttribute('href') || link.href
      window.open(linkUrl, '_blank')
      hideLinkTooltip()
    })
  }

  if (helpBtn) {
    helpBtn.addEventListener('click', (e) => {
      e.preventDefault()
      // Show help information
      alert(
        'Link Help:\n• Click Edit to modify the link\n• Click Open to open in new tab\n• Click Copy to copy URL\n• Click Settings for advanced options',
      )
    })
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const linkUrl = link.dataset.mceHref || link.getAttribute('href') || link.href
      navigator.clipboard.writeText(linkUrl).then(() => {
        // Show success feedback
        const originalText = copyBtn.innerHTML
        const copyBtnHtml = copyBtn as HTMLElement
        copyBtnHtml.innerHTML = '<i class="fas fa-check"></i>'
        copyBtnHtml.style.background = '#28a745'
        setTimeout(() => {
          copyBtnHtml.innerHTML = originalText
          copyBtnHtml.style.background = '#007cba'
        }, 1000)
      })
    })
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', (e) => {
      e.preventDefault()
      // Show link properties dialog
      editor.execCommand('mceLink')
      hideLinkTooltip()
    })
  }

  // Add mouse events to tooltip to prevent it from disappearing
  tooltipElement.addEventListener('mouseenter', () => {
    // Cancel any pending hide timeout
    if (tooltipHideTimeout) {
      clearTimeout(tooltipHideTimeout)
      tooltipHideTimeout = null
    }
  })

  tooltipElement.addEventListener('mouseleave', () => {
    // Hide tooltip when mouse leaves the tooltip itself
    hideLinkTooltip()
  })
}

const hideLinkTooltip = () => {
  // Clear any pending hide timeout
  if (tooltipHideTimeout) {
    clearTimeout(tooltipHideTimeout)
    tooltipHideTimeout = null
  }

  if (tooltipElement) {
    tooltipElement.remove()
    tooltipElement = null
  }
}

const getEditor = () => {
  return editor
}

defineExpose({
  getEditor,
})
</script>

<style scoped>
.the-editor {
  width: 100%;
}

::deep(.tox-tinymce) {
  border-radius: 0;
  border: none;
  min-height: var(--min-height) !important;
  height: var(--editor-height) !important;
  display: flex;
  flex-direction: column;
}

::deep(.tox-tinymce.tox-edit-focus) {
  min-height: var(--min-height) !important;
  height: var(--editor-height) !important;
  border: none !important;
}

/* Ensure the edit area grows to fill the fixed height and handles scrolling */
::deep(.tox-editor-container) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

::deep(.tox-edit-area) {
  flex: 1;
  overflow: hidden;
  display: flex;
}

::deep(.tox-edit-area iframe) {
  flex: 1 !important;
  height: 100% !important;
}

/* Let TinyMCE autoresize manage inner heights */

::deep(.tox .tox-toolbar),
::deep(.tox .tox-toolbar__primary) {
  background: #f8f9fa !important;
}

::deep(.tox-editor-header) {
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
  background-color: white !important;
  border-bottom: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

.dark ::deep(.tox-editor-header) {
  background-color: #1e293b !important;
  border-bottom-color: #334155 !important;
}

::deep(.tox-promotion),
::deep(.tox-notification--warn),
::deep(.tox-notification--warning) {
  display: none !important;
}

::deep(.tox-tinymce:focus-within) {
  border: none !important;
}

:deep(.tox .tox-edit-area::before) {
  content: none !important;
  border: 0 !important;
  border-width: 0 !important;
  border-style: none !important;
  border-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}

/* Reduce line spacing in editor */
::deep(.tox .tox-edit-area iframe) {
  line-height: 1.3 !important;
}

::deep(.tox .tox-edit-area iframe body) {
  line-height: 1.3 !important;
}

::deep(.tox .tox-edit-area iframe p) {
  margin: 0 0 6px 0 !important;
  line-height: 1.3 !important;
}

::deep(.tox .tox-edit-area iframe div) {
  line-height: 1.3 !important;
}

/* Hide Title and Open link in fields in link dialog */
::deep(.tox-dialog .tox-form__group:nth-last-child(2)), /* Title field */
::deep(.tox-dialog .tox-form__group:nth-last-child(1)) {
  /* Open link in field */
  display: none !important;
}

/* Link tooltip styles */
:global(.link-tooltip) {
  position: fixed;
  background: white;
  color: #333;
  padding: 0;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  z-index: 9999;
  max-width: 280px;
  animation: tooltipFadeIn 0.2s ease-out;
  border: 1px solid #e0e0e0;
}

:global(.tooltip-content) {
  padding: 8px 12px;
}

:global(.tooltip-text) {
  color: #333;
  font-weight: 400;
  margin-bottom: 8px;
  font-size: 13px;
  text-align: center;
}

:global(.tooltip-actions) {
  display: flex;
  gap: 2px;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 4px;
  padding: 4px;
  margin-top: 4px;
  border: 1px solid #e9ecef;
}

:global(.tooltip-btn) {
  background: transparent;
  color: #666;
  border: none;
  padding: 6px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: all 0.2s;
}

:global(.tooltip-btn:hover) {
  background: #f0f0f0;
  color: #333;
}

:global(.tooltip-btn i) {
  font-size: 11px;
}

:global(.tooltip-btn.edit-btn) {
  color: #007cba;
}

:global(.tooltip-btn.open-btn) {
  color: #28a745;
}

:global(.tooltip-btn.help-btn) {
  color: #ffc107;
}

:global(.tooltip-btn.copy-btn) {
  color: #6c757d;
}

:global(.tooltip-btn.settings-btn) {
  color: #6c757d;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hide unwanted fields in image dialog */
::deep(.tox-dialog .tox-form__group:nth-child(2)), /* Alternative description */
::deep(.tox-dialog .tox-form__group:nth-child(3)), /* Width */
::deep(.tox-dialog .tox-form__group:nth-child(4)), /* Height */
::deep(.tox-dialog .tox-form__group:nth-child(5)), /* Title */
::deep(.tox-dialog .tox-form__group:nth-child(6)) {
  /* Description */
  display: none !important;
}

/* Hide lock icon (constrain proportions) */
::deep(.tox-dialog .tox-lock),
::deep(.tox-dialog .tox-lock-wrapper),
::deep(.tox-dialog .tox-form__controls-h-stack .tox-lock),
::deep(.tox-dialog .tox-button[aria-label*='Constrain']),
::deep(.tox-dialog .tox-button[title*='Constrain']),
::deep(.tox-dialog .tox-button[data-mce-name='constrain']),
::deep(.tox-dialog .tox-button--icon-and-text),
::deep(.tox-dialog .tox-button[aria-pressed]),
::deep(.tox-dialog button[type='button']:has(.tox-icon-lock)),
::deep(.tox-dialog .tox-icon-lock) {
  display: none !important;
}

/* Fix TinyMCE dropdowns and dialogs z-index hidden behind Modal */
:global(.tox-tinymce-aux) {
  z-index: 999999 !important;
}

/* Style the file picker button */
::deep(.tox-dialog .tox-button--icon) {
  background: #007cba !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 8px 16px !important;
  font-weight: 500 !important;
}

::deep(.tox-dialog .tox-button--icon:hover) {
  background: #005a87 !important;
}
</style>
