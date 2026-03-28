"use client";
import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, ChevronRight, ChevronLeft, 
  Sun, LayoutDashboard, Wrench, Package, BarChart, MonitorPlay,
  Image as ImageIcon, Film, Grid, X, ZoomIn, Volume2, VolumeX
} from 'lucide-react';

// --- DADOS DAS TELAS LOCAIS ---
const allScreens = [
  // Visão Geral
  { path: '/login.jpeg', title: 'Acesso Seguro', cat: 'Visão Geral', desc: 'Interface de login com autenticação multifator para garantir a segurança dos dados operacionais.' },
  { path: '/tela_principal.jpeg', title: 'Dashboard Central', cat: 'Visão Geral', desc: 'Visão em tempo real de KPIs, status de usinas e alertas críticos de O&M.' },
  { path: '/tela_principal_filtro_busca.jpeg', title: 'Busca Global', cat: 'Visão Geral', desc: 'Sistema de busca inteligente para localizar rapidamente qualquer atividade ou item no sistema.' },
  { path: '/tela_principal_filtro_data.jpeg', title: 'Análise Temporal', cat: 'Visão Geral', desc: 'Filtros avançados por período para acompanhamento histórico de produtividade.' },

  // Atividades
  { path: '/tela_visualizar_atividade.jpeg', title: 'Gestão de Ordem de Serviço', cat: 'Atividades', desc: 'Visualização completa de uma atividade: cronograma, responsáveis e check-list de campo.' },
  { path: '/visualizar_evidencia.jpeg', title: 'Evidência Fotográfica', cat: 'Atividades', desc: 'Registro visual direto do campo, garantindo a transparência e qualidade do serviço executado.' },
  { path: '/tela_criar_atividades.jpeg', title: 'Abertura de Chamado', cat: 'Atividades', desc: 'Formulário ágil para criação de novas manutenções preventivas ou corretivas.' },
  { path: '/criar_atividade_eletrica.jpeg', title: 'Manutenção Elétrica', cat: 'Atividades', desc: 'Campos específicos para medições elétricas e inspeção de inversores.' },
  { path: '/criar_atividade_rocada.jpeg', title: 'Serviço de Roçada', cat: 'Atividades', desc: 'Gestão de manutenção de áreas verdes e limpeza do terreno da usina.' },
  { path: '/previo_atividade.jpeg', title: 'Ficha de Campo', cat: 'Atividades', desc: 'Resumo da atividade pronto para consulta mobile ou impressão pelo técnico.' },
  { path: '/tela_select_user_atividade.jpeg', title: 'Matriz de Responsabilidade', cat: 'Atividades', desc: 'Interface de seleção de técnicos baseada em disponibilidade e especialização.' },

  // Estoque
  { path: '/tela_estoque.jpeg', title: 'Controle de Inventário', cat: 'Estoque', desc: 'Gestão completa de materiais, de inversores a conectores MC4.' },
  { path: '/tela_estoque_filtro.jpeg', title: 'Estoque Inteligente', cat: 'Estoque', desc: 'Visualização filtrada por família e criticidade para evitar rupturas de estoque.' },
  { path: '/cadastro_estoque_01.jpeg', title: 'Novo Ativo', cat: 'Estoque', desc: 'Cadastro detalhado de novos itens com especificações técnicas e fornecedores.' },
  { path: '/cadastro_estoque_02.jpeg', title: 'Dados Avançados de Ativo', cat: 'Estoque', desc: 'Informações de número de série, garantia e localização precisa no almoxarifado.' },
  { path: '/tela_import_estoque_massa.jpeg', title: 'Importação Via Planilha', cat: 'Estoque', desc: 'Sincronização ágil de grandes inventários facilitando a implantação inicial.' },

  // Relatórios
  { path: '/tela_relatorios.jpeg', title: 'Módulo de BI', cat: 'Relatórios', desc: 'Interface central para geração de relatórios gerenciais e técnicos.' },
  { path: '/busca_relatorio_apresentacao.jpeg', title: 'Filtros de Relatório', cat: 'Relatórios', desc: 'Seleção fina de dados para compor apresentações para investidores.' },
  { path: '/previo_relatorios.jpeg', title: 'Prévia de Documento', cat: 'Relatórios', desc: 'Visualização instantânea do relatório antes da exportação final.' },
  { path: '/tela_export.jpeg', title: 'Formatos de Exportação', cat: 'Relatórios', desc: 'Suporte a PDF, Excel e apresentações automatizadas em PPTX.' },
  { path: '/tela_template_relatorio.jpeg', title: 'Template Customizado', cat: 'Relatórios', desc: 'Editor de layout para relatórios seguindo a identidade visual da sua empresa.' },

  // Configurações
  { path: '/tela_user.jpeg', title: 'Painel de Usuários', cat: 'Configurações', desc: 'Gestão de permissões e acessos por nível hierárquico (Admin, Técnico, Cliente).' },
  { path: '/criacao_user.jpeg', title: 'Novo Colaborador', cat: 'Configurações', desc: 'Interface simplificada para onboard de novos membros da equipe.' },
  { path: '/tela_confg_usinas.jpeg', title: 'Gestão de Site', cat: 'Configurações', desc: 'Configuração técnica de cada usina: geolocalização, potência e strings.' },
  { path: '/tela_confg_estoque.jpeg', title: 'Parâmetros de Estoque', cat: 'Configurações', desc: 'Definição de níveis mínimos e alertas de reposição.' },
  { path: '/tela_confg_categoria_atividades.jpeg', title: 'Categorias O&M', cat: 'Configurações', desc: 'Parametrização de tipos de serviço para padronização operacional.' },
];

const getImageUrl = (path: string | null) => path || '';

// --- INTERFACES ---
interface AppScreen {
  path: string;
  title: string;
  cat: string;
  desc: string;
}

interface AppScene {
  id: number;
  time: string;
  title: string;
  visual: string;
  action: string;
  narration: string;
  path: string | null;
  icon: React.ReactNode;
  bgClass: string;
}

// --- ROTEIRO COM AS IMAGENS REAIS ---
const scenes: AppScene[] = [
  {
    id: 1,
    time: "00:00 - 00:10",
    title: "Abertura e Segurança",
    visual: "Interface de login. Texto: 'Cansado do caos operacional?'",
    action: "TRANSICÃO para TELA DE LOGIN. Mostrando acesso seguro e profissional.",
    narration: "A gestão da sua usina solar ainda depende de planilhas? É hora de profissionalizar com segurança. Conheça o Solar Manager.",
    path: "/login.jpeg",
    icon: <Sun className="w-12 h-12 text-yellow-400" />,
    bgClass: "bg-gradient-to-br from-slate-900 via-blue-900 to-orange-900",
  },
  {
    id: 2,
    time: "00:10 - 00:25",
    title: "Visão Geral e Controle",
    visual: "Dashboard Principal em tela cheia.",
    action: "ZOOM no Dashboard Principal. Destaque para os gráficos de desempenho e resumo de atividades.",
    narration: "Acesse de qualquer lugar. O Solar Manager centraliza o controle total da sua usina em um único dashboard intuitivo.",
    path: "/tela_principal.jpeg",
    icon: <LayoutDashboard className="w-12 h-12 text-blue-400" />,
    bgClass: "bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 pattern-grid",
  },
  {
    id: 3,
    time: "00:25 - 00:40",
    title: "Digitalização do Campo",
    visual: "Visualização de Atividade com fotos anexas.",
    action: "Destaque nas EVIDÊNCIAS FOTOGRÁFICAS. Mostrando como o técnico registra o serviço no local.",
    narration: "Elimine o papel. Assim seus técnicos registram as evidências diretamente no campo, garantindo transparência e rastreabilidade total.",
    path: "/tela_visualizar_atividade.jpeg",
    icon: <Wrench className="w-12 h-12 text-emerald-400" />,
    bgClass: "bg-gradient-to-br from-slate-900 to-emerald-950",
  },
  {
    id: 4,
    time: "00:40 - 00:50",
    title: "Inventário Inteligente",
    visual: "Lista de Estoque detalhada.",
    action: "Navegação pela ABA ESTOQUE. Filtros de criticidade para evitar falta de componentes críticos.",
    narration: "Garantia de disponibilidade. Tenha um controle preciso do seu inventário com a baixa automática no estoque ao finalizar cada atividade. Receba alertas inteligentes para a reposição de itens críticos.",
    path: "/tela_estoque.jpeg",
    icon: <Package className="w-12 h-12 text-yellow-500" />,
    bgClass: "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800",
  },
  {
    id: 5,
    time: "00:50 - 01:00",
    title: "Relatórios Estratégicos",
    visual: "Central de Relatórios e Exportação.",
    action: "Geração de um RELATÓRIO PDF. Mostrando a facilidade de exportar dados para reuniões de resultados.",
    narration: "Transforme dados em decisões. Gere relatórios executivos em segundos e foque no que realmente importa: a sua produtividade.",
    path: "/tela_relatorios.jpeg",
    icon: <BarChart className="w-12 h-12 text-emerald-500" />,
    bgClass: "bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-900",
  },
  {
    id: 6,
    time: "01:00 - 01:10",
    title: "Chamada para Ação",
    visual: "Logotipo do 'Solar Manager' no centro. Fundo de usina ao pôr do sol.",
    action: "Animação de entrada do logo e link. Fade out final mostrando 'CTA MANAGER'.",
    narration: "Solar Manager. A energia que move o seu negócio, agora sob o seu controle total. Solicite a sua demonstração personalizada.",
    path: null,
    icon: <MonitorPlay className="w-12 h-12 text-yellow-400" />,
    bgClass: "bg-gradient-to-br from-blue-950 via-slate-900 to-orange-800",
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'storyboard' | 'gallery'>('storyboard');
  const [selectedImage, setSelectedImage] = useState<AppScreen | null>(null);
  
  // Bloquear scroll do corpo quando a imagem estiver ampliada
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const handleImageClick = (item: AppScreen | AppScene) => {
    // Adapter to ensure AppScreen interface is met
    const screen: AppScreen = {
      path: item.path || '',
      title: item.title,
      desc: 'narration' in item ? item.narration : item.desc,
      cat: 'cat' in item ? item.cat : 'Presentation'
    };
    setSelectedImage(screen);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col items-center py-8 px-4 sm:px-8">
      
      {/* Header & Tabs */}
      <div className="w-full max-w-6xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
            <Sun className="text-yellow-400 w-8 h-8 md:w-10 md:h-10" />
            Solar Manager
          </h1>
          <p className="text-emerald-400 text-sm md:text-base font-medium mt-1">Apresentação de Telas e Storyboard</p>
        </div>
        
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('storyboard')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'storyboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Film size={18} /> Storyboard do Vídeo
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'gallery' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Grid size={18} /> Galeria Completa ({allScreens.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'storyboard' ? (
        <StoryboardView 
          onImageClick={handleImageClick} 
          onComplete={() => setActiveTab('gallery')} 
        />
      ) : (
        <GalleryView onImageClick={handleImageClick} />
      )}

      {/* Image Modal (Zoom) */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button 
            onClick={() => setSelectedImage(null)}
            className="fixed top-6 right-6 p-2 bg-slate-800 hover:bg-red-600 text-white rounded-full transition-colors z-[60]"
          >
            <X size={24} />
          </button>
          <img 
            src={getImageUrl(selectedImage.path)} 
            alt={selectedImage.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-slate-700"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Erro+ao+carregar+imagem'; }}
          />
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="bg-slate-900/80 px-6 py-2 rounded-full border border-slate-700 text-white font-medium text-sm backdrop-blur-md">
              {selectedImage.title}
            </div>
            {selectedImage.desc && (
              <p className="bg-black/60 px-4 py-2 rounded-lg text-slate-300 text-xs max-w-md text-center backdrop-blur-sm">
                {selectedImage.desc}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

// --- COMPONENTE: STORYBOARD (ANIMATIC) ---
function StoryboardView({ onImageClick, onComplete }: { onImageClick: (item: AppScene) => void, onComplete: () => void }) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const scene: AppScene = scenes[currentSceneIndex] as AppScene;
  const sceneProgress = ((currentSceneIndex + 1) / scenes.length) * 100;

  // Função para narrar o texto
  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    
    // Cancela narrações anteriores
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Tenta encontrar uma voz em Português
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt-PT'));
    if (ptVoice) utterance.voice = ptVoice;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (isVoiceEnabled) {
      speak(scene.narration);
    }
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [currentSceneIndex, isVoiceEnabled]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSceneIndex((prev) => {
          if (prev < scenes.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 7000); // Aumentado para dar tempo de narrar
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-full max-w-6xl flex flex-col gap-4 animate-in fade-in duration-500">
      
      {/* Player Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-slate-900 p-4 rounded-xl border border-slate-800 gap-4">
        <div className="flex items-center justify-between sm:justify-start gap-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 text-nowrap">
            <MonitorPlay className="text-blue-400" size={20}/> Modo Player
          </h2>
          
          <button 
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isVoiceEnabled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
            title={isVoiceEnabled ? 'Desativar Narrador' : 'Ativar Narrador'}
          >
            {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {isVoiceEnabled ? 'Narrador ON' : 'Narrador OFF'}
          </button>
        </div>

        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold text-sm ${isPlaying ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          {isPlaying ? 'Pausar Cena' : 'Reproduzir Vídeo'}
        </button>
      </div>

      <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]">
        {/* Visual Preview Area */}
        <div className={`w-full md:w-3/5 relative flex flex-col items-center justify-center p-4 sm:p-12 transition-all duration-700 ${scene.bgClass}`}>
          
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-yellow-400 border border-yellow-400/30">
            {scene.time}
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-blue-300 border border-blue-400/30">
            Cena {scene.id} de {scenes.length}
          </div>

          {/* Render Actual Image if available */}
          {scene.path ? (
            <div 
              className="z-10 w-full max-w-lg bg-slate-950 border border-slate-600 rounded-xl aspect-video flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer"
              onClick={() => onImageClick(scene)}
            >
              <img 
                src={getImageUrl(scene.path)} 
                alt={scene.title} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.style.display = 'none'; 
                if (target.nextSibling instanceof HTMLElement) {
                  target.nextSibling.style.display = 'flex';
                }
              }}
              />
              <div className="hidden absolute inset-0 flex-col items-center justify-center text-slate-500 p-4 text-center">
                <ImageIcon size={32} className="mb-2" />
                <p className="text-sm">Erro ao carregar imagem local.</p>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10 drop-shadow-lg" />
              </div>
            </div>
          ) : (
            <div className="z-10 text-center">
              <Sun className="w-16 h-16 text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              <h2 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">Solar Manager</h2>
              <p className="text-emerald-400 font-mono mt-3 text-lg drop-shadow-md">solarmanager.codenu.com.br</p>
            </div>
          )}
        </div>

        {/* Script Details Area */}
        <div className="w-full md:w-2/5 bg-slate-900 p-6 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l border-slate-700 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
             <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${sceneProgress}%`}}></div>
          </div>

          <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-3 mt-2">
            <span className="text-blue-400 mr-2">{scene.id}.</span>{scene.title}
          </h2>

          <div className="space-y-6 flex-grow">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">Visual & Ação</h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                {scene.action}
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2 flex items-center gap-2">
                🎙️ Narração
              </h3>
              <p className="text-base text-emerald-50 leading-relaxed bg-emerald-950/30 p-4 rounded-xl border border-emerald-900/50 italic shadow-inner">
                "{scene.narration}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-2 px-2">
        <button onClick={() => setCurrentSceneIndex(p => Math.max(0, p - 1))} disabled={currentSceneIndex === 0} className="p-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-full text-white transition-colors flex items-center gap-2">
          <ChevronLeft size={20} /> <span className="hidden sm:inline text-sm">Anterior</span>
        </button>
        <div className="flex gap-2">
          {scenes.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSceneIndex(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${currentSceneIndex === idx ? 'bg-blue-400 scale-150' : 'bg-slate-700'}`} />
          ))}
        </div>
        <button 
          onClick={() => {
            if (currentSceneIndex === scenes.length - 1) {
              onComplete();
            } else {
              setCurrentSceneIndex(p => p + 1);
            }
          }} 
          className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors flex items-center gap-2 px-6"
        >
           <span className="text-sm font-bold">
             {currentSceneIndex === scenes.length - 1 ? 'Galeria Completa' : 'Próxima'}
           </span> 
           <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTE: GALERIA DE TELAS ---
function GalleryView({ onImageClick }: { onImageClick: (screen: AppScreen) => void }) {
  // Agrupar por categoria
  const categories = [...new Set(allScreens.map(s => s.cat))];

  return (
    <div className="w-full max-w-6xl animate-in fade-in duration-500 space-y-10">
      <div className="bg-blue-950/30 border border-blue-900/50 p-4 rounded-xl text-blue-200 text-sm flex items-center gap-3">
        <ImageIcon className="text-blue-400 shrink-0" />
        <p>Abaixo estão todas as <strong>{allScreens.length} telas principais</strong> do sistema. Explore as seções para entender cada funcionalidade.</p>
      </div>

      {categories.map(cat => (
        <div key={cat} className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            {cat}
          </h2>
          
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allScreens.filter(s => s.cat === cat).map(screen => (
              <div 
                key={screen.path} 
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all cursor-pointer group"
                onClick={() => onImageClick(screen)}
              >
                <div className="aspect-video bg-slate-950 relative overflow-hidden">
                  <img 
                    src={getImageUrl(screen.path)} 
                    alt={screen.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Erro+Carregamento'; }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8 drop-shadow-md" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-200 text-sm mb-1">{screen.title}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{screen.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}