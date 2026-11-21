import BashMark from './BashMark.svelte'
import CachyOSMark from './CachyOSMark.svelte'
import CMark from './CMark.svelte'
import CppMark from './CppMark.svelte'
import DockerMark from './DockerMark.svelte'
import ExpressMark from './ExpressMark.svelte'
import GitMark from './GitMark.svelte'
import GithubActionsMark from './GithubActionsMark.svelte'
import HeliumMark from './HeliumMark.svelte'
import JavaScriptMark from './JavaScriptMark.svelte'
import KittyMark from './KittyMark.svelte'
import LatexMark from './LatexMark.svelte'
import LuaMark from './LuaMark.svelte'
import MpvMark from './MpvMark.svelte'
import NeovimMark from './NeovimMark.svelte'
import NodeMark from './NodeMark.svelte'
import OpenCodeMark from './OpenCodeMark.svelte'
import ObsidianMark from './ObsidianMark.svelte'
import PythonMark from './PythonMark.svelte'
import SvelteMark from './SvelteMark.svelte'
import SwayMark from './SwayMark.svelte'
import TypeScriptMark from './TypeScriptMark.svelte'
import ViteMark from './ViteMark.svelte'

export const tools = [
  { label: 'C', icon: CMark, stack: 'Languages' },
  { label: 'Python', icon: PythonMark, stack: 'Languages' },
  { label: 'JavaScript', icon: JavaScriptMark, stack: 'Languages' },
  { label: 'TypeScript', icon: TypeScriptMark, stack: 'Languages' },
  { label: 'Bash', icon: BashMark, stack: 'Languages', uses: true, subtext: 'Shell', link: 'https://www.gnu.org/software/bash/' },
  { label: 'Lua', icon: LuaMark, stack: 'Languages' },
  { label: 'C++', icon: CppMark, stack: 'Languages' },
  { label: 'Svelte', icon: SvelteMark, stack: 'Frameworks' },
  { label: 'Vite', icon: ViteMark, stack: 'Frameworks' },
  { label: 'Node.js', icon: NodeMark, stack: 'Frameworks' },
  { label: 'LaTeX', icon: LatexMark, stack: 'Frameworks' },
  { label: 'Express', icon: ExpressMark, stack: 'Frameworks' },
  { label: 'Neovim', icon: NeovimMark, stack: 'Tools', uses: true, subtext: 'Text editor', link: 'https://neovim.io' },
  { label: 'OpenCode', icon: OpenCodeMark, stack: 'Tools' },
  { label: 'Docker', icon: DockerMark, stack: 'Tools' },
  { label: 'Git', icon: GitMark, stack: 'Tools' },
  { label: 'GitHub Actions', icon: GithubActionsMark, stack: 'Tools' },
  { label: 'CachyOS', icon: CachyOSMark, uses: true, subtext: 'Operating system', link: 'https://cachyos.org' },
  { label: 'Sway', icon: SwayMark, uses: true, subtext: 'Window manager', link: 'https://swaywm.org' },
  { label: 'kitty', icon: KittyMark, uses: true, subtext: 'Terminal emulator', link: 'https://sw.kovidgoyal.net/kitty/' },
  { label: 'Helium', icon: HeliumMark, uses: true, subtext: 'Web browser', link: 'https://helium.computer' },
  { label: 'Obsidian', icon: ObsidianMark, uses: true, subtext: 'Note-taking app', link: 'https://obsidian.md' },
  { label: 'mpv', icon: MpvMark, uses: true, subtext: 'Media player', link: 'https://mpv.io' },
]

const desktopOrder = ['CachyOS', 'Sway', 'kitty', 'Neovim', 'Bash', 'Helium', 'Obsidian', 'mpv']
export const desktopTools = desktopOrder.map((label) => tools.find((tool) => tool.label === label))

export const stackGroups = ['Languages', 'Frameworks', 'Tools'].map((label) => ({
  label,
  items: tools.filter((tool) => tool.stack === label),
}))
