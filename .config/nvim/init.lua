vim.g.mapleader = ' '

vim.g.localleader = ' '
 
 
vim.api.nvim_set_keymap('i', 'jk', '<ESC>', {noremap = true})

vim.api.nvim_set_keymap('n', 'x', '"_d', {noremap = true} )

vim.api.nvim_set_keymap('v', 'x', '"_d' , {noremap = true})

vim.api.nvim_set_keymap('v', 'ay', '"ay' , {noremap = true})
vim.api.nvim_set_keymap('v', 'by', '"by' , {noremap = true})


vim.api.nvim_set_keymap('n', 'ap', '"ap' , {noremap = true})
vim.api.nvim_set_keymap('n', 'bp', '"bp' , {noremap = true})

vim.api.nvim_set_keymap('i', '<C-l>', '<c-g>u<Esc>[s0z=`]a<c-g>u', {noremap = true})

vim.cmd[[set spelllang=en,cjk]]

vim.o.number = true

vim.o.clipboard = 'unnamedplus'

vim.o.cursorline = true

vim.wo.relativenumber = true

vim.cmd[[let g:python3_host_prog = '/usr/bin/python3']]
 
require('packerplug')

 
vim.cmd[[autocmd FileType python map <buffer> <Leader>p :w<CR>:exec '!python3' shellescape(@%, 1)<CR>]]


vim.cmd[[inoremap <C-f> <Esc>: silent exec '.!inkscape-figures create "'.getline('.').'" "'.b:vimtex.root.'/figures/"'<CR><CR>:w<CR> ]]
vim.cmd[[nnoremap <C-f> : silent exec '!inkscape-figures edit "'.b:vimtex.root.'/figures/" > /dev/null 2>&1 &'<CR><CR>:redraw!<CR> ]]

vim.cmd[[nnoremap <C-s> :  ! for FILE in ./figures/*.svg; do inkscape -D $FILE  -o .pdf --export-latex; done <CR>]]
