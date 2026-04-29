interface FoodIconProps {
  size?: number;
}

export function TucumaIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Tucumã - fruta alaranjada oval */}
      {/* Base laranja */}
      <rect x="5" y="3" width="6" height="2" fill="#f97316" />
      <rect x="4" y="5" width="8" height="6" fill="#f97316" />
      <rect x="5" y="11" width="6" height="2" fill="#f97316" />
      
      {/* Sombra/detalhes mais escuros */}
      <rect x="4" y="9" width="2" height="2" fill="#ea580c" />
      <rect x="10" y="9" width="2" height="2" fill="#ea580c" />
      <rect x="6" y="11" width="4" height="2" fill="#ea580c" />
      
      {/* Brilho */}
      <rect x="7" y="5" width="2" height="2" fill="#fb923c" />
      <rect x="8" y="6" width="1" height="1" fill="#fdba74" />
      
      {/* Talo */}
      <rect x="7" y="1" width="2" height="2" fill="#65a30d" />
      <rect x="8" y="2" width="2" height="1" fill="#84cc16" />
    </svg>
  );
}

export function BuritiIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Buriti - fruta vermelha/marrom redonda */}
      {/* Base vermelha escura */}
      <rect x="6" y="4" width="4" height="2" fill="#dc2626" />
      <rect x="5" y="6" width="6" height="4" fill="#dc2626" />
      <rect x="6" y="10" width="4" height="2" fill="#dc2626" />
      
      {/* Textura escamada característica */}
      <rect x="5" y="6" width="2" height="1" fill="#991b1b" />
      <rect x="9" y="6" width="2" height="1" fill="#991b1b" />
      <rect x="6" y="7" width="1" height="1" fill="#991b1b" />
      <rect x="9" y="7" width="1" height="1" fill="#991b1b" />
      <rect x="5" y="8" width="2" height="1" fill="#991b1b" />
      <rect x="9" y="8" width="2" height="1" fill="#991b1b" />
      <rect x="6" y="9" width="1" height="1" fill="#991b1b" />
      <rect x="9" y="9" width="1" height="1" fill="#991b1b" />
      
      {/* Brilho */}
      <rect x="7" y="5" width="2" height="1" fill="#ef4444" />
      <rect x="8" y="6" width="1" height="1" fill="#f87171" />
      
      {/* Talo */}
      <rect x="7" y="2" width="2" height="2" fill="#65a30d" />
      <rect x="8" y="3" width="2" height="1" fill="#84cc16" />
    </svg>
  );
}

export function CupuacuIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Cupuaçu - fruta marrom grande oval */}
      {/* Base marrom */}
      <rect x="4" y="4" width="8" height="2" fill="#92400e" />
      <rect x="3" y="6" width="10" height="5" fill="#92400e" />
      <rect x="4" y="11" width="8" height="2" fill="#92400e" />
      
      {/* Sombra */}
      <rect x="3" y="9" width="2" height="2" fill="#78350f" />
      <rect x="11" y="9" width="2" height="2" fill="#78350f" />
      <rect x="5" y="11" width="6" height="2" fill="#78350f" />
      
      {/* Textura/estrias da casca */}
      <rect x="5" y="6" width="1" height="1" fill="#78350f" />
      <rect x="7" y="6" width="1" height="1" fill="#78350f" />
      <rect x="9" y="6" width="1" height="1" fill="#78350f" />
      <rect x="11" y="6" width="1" height="1" fill="#78350f" />
      <rect x="6" y="7" width="1" height="1" fill="#78350f" />
      <rect x="8" y="7" width="1" height="1" fill="#78350f" />
      <rect x="10" y="7" width="1" height="1" fill="#78350f" />
      <rect x="5" y="8" width="1" height="1" fill="#78350f" />
      <rect x="7" y="8" width="1" height="1" fill="#78350f" />
      <rect x="9" y="8" width="1" height="1" fill="#78350f" />
      
      {/* Brilho */}
      <rect x="6" y="5" width="2" height="1" fill="#a16207" />
      <rect x="7" y="6" width="1" height="1" fill="#b45309" />
      
      {/* Talo */}
      <rect x="7" y="2" width="2" height="2" fill="#65a30d" />
      <rect x="8" y="3" width="2" height="1" fill="#84cc16" />
    </svg>
  );
}

export function JamboIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Jambo - fruta amarela/dourada em forma de sino/pera */}
      {/* Base amarela */}
      <rect x="6" y="5" width="4" height="2" fill="#eab308" />
      <rect x="5" y="7" width="6" height="3" fill="#eab308" />
      <rect x="6" y="10" width="4" height="2" fill="#eab308" />
      <rect x="7" y="12" width="2" height="1" fill="#eab308" />
      
      {/* Sombra */}
      <rect x="5" y="9" width="2" height="1" fill="#ca8a04" />
      <rect x="9" y="9" width="2" height="1" fill="#ca8a04" />
      <rect x="6" y="10" width="1" height="2" fill="#ca8a04" />
      <rect x="9" y="10" width="1" height="2" fill="#ca8a04" />
      
      {/* Brilho */}
      <rect x="7" y="6" width="2" height="1" fill="#fde047" />
      <rect x="8" y="7" width="1" height="1" fill="#fef08a" />
      
      {/* Talo grosso característico */}
      <rect x="7" y="3" width="2" height="2" fill="#65a30d" />
      <rect x="6" y="4" width="4" height="1" fill="#84cc16" />
    </svg>
  );
}

export function AcaiIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Ramo de Açaí - várias frutinhas roxas escuras em cacho */}
      {/* Galho/caule */}
      <rect x="7" y="2" width="2" height="3" fill="#92400e" />
      <rect x="6" y="4" width="1" height="2" fill="#92400e" />
      <rect x="9" y="4" width="1" height="2" fill="#92400e" />
      
      {/* Frutinhas roxas escuras (açaí) */}
      {/* Fileira superior */}
      <rect x="5" y="6" width="2" height="2" fill="#581c87" />
      <rect x="7" y="5" width="2" height="2" fill="#581c87" />
      <rect x="9" y="6" width="2" height="2" fill="#581c87" />
      
      {/* Fileira meio */}
      <rect x="4" y="8" width="2" height="2" fill="#6b21a8" />
      <rect x="6" y="7" width="2" height="2" fill="#6b21a8" />
      <rect x="8" y="7" width="2" height="2" fill="#6b21a8" />
      <rect x="10" y="8" width="2" height="2" fill="#6b21a8" />
      
      {/* Fileira inferior */}
      <rect x="5" y="10" width="2" height="2" fill="#581c87" />
      <rect x="7" y="9" width="2" height="2" fill="#581c87" />
      <rect x="9" y="10" width="2" height="2" fill="#581c87" />
      
      {/* Brilhos nas frutinhas */}
      <rect x="6" y="6" width="1" height="1" fill="#7c3aed" />
      <rect x="8" y="5" width="1" height="1" fill="#7c3aed" />
      <rect x="7" y="8" width="1" height="1" fill="#7c3aed" />
      <rect x="8" y="10" width="1" height="1" fill="#7c3aed" />
    </svg>
  );
}

export function MatrinxaIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Peixe Matrinxã - peixe amazônico com corpo alongado e tons de cinza/prata */}
      {/* Corpo principal - cinza prateado */}
      <rect x="3" y="6" width="9" height="4" fill="#94a3b8" />
      <rect x="2" y="7" width="1" height="2" fill="#94a3b8" />
      <rect x="12" y="7" width="1" height="2" fill="#94a3b8" />
      
      {/* Cabeça */}
      <rect x="2" y="7" width="2" height="2" fill="#64748b" />
      <rect x="1" y="8" width="1" height="1" fill="#64748b" />
      
      {/* Olho */}
      <rect x="3" y="7" width="1" height="1" fill="#1e293b" />
      
      {/* Barbatana dorsal */}
      <rect x="6" y="4" width="3" height="2" fill="#64748b" />
      <rect x="7" y="3" width="2" height="1" fill="#475569" />
      
      {/* Barbatana caudal (cauda) */}
      <rect x="12" y="5" width="2" height="1" fill="#64748b" />
      <rect x="12" y="6" width="3" height="4" fill="#64748b" />
      <rect x="12" y="10" width="2" height="1" fill="#64748b" />
      <rect x="14" y="6" width="1" height="1" fill="#475569" />
      <rect x="14" y="9" width="1" height="1" fill="#475569" />
      
      {/* Barbatana peitoral */}
      <rect x="4" y="9" width="2" height="2" fill="#64748b" />
      
      {/* Detalhes/escamas */}
      <rect x="5" y="7" width="1" height="1" fill="#cbd5e1" />
      <rect x="7" y="7" width="1" height="1" fill="#cbd5e1" />
      <rect x="9" y="7" width="1" height="1" fill="#cbd5e1" />
      <rect x="6" y="8" width="1" height="1" fill="#cbd5e1" />
      <rect x="8" y="8" width="1" height="1" fill="#cbd5e1" />
      <rect x="10" y="8" width="1" height="1" fill="#cbd5e1" />
    </svg>
  );
}

export function JaraquiIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Peixe Jaraqui - peixe amazônico com listras escuras e tons acinzentados */}
      {/* Corpo principal - cinza médio */}
      <rect x="3" y="6" width="9" height="4" fill="#9ca3af" />
      <rect x="2" y="7" width="1" height="2" fill="#9ca3af" />
      <rect x="12" y="7" width="1" height="2" fill="#9ca3af" />
      
      {/* Cabeça */}
      <rect x="2" y="7" width="2" height="2" fill="#6b7280" />
      <rect x="1" y="8" width="1" height="1" fill="#6b7280" />
      
      {/* Olho */}
      <rect x="3" y="7" width="1" height="1" fill="#111827" />
      
      {/* Listras características do Jaraqui */}
      <rect x="5" y="6" width="1" height="4" fill="#374151" />
      <rect x="7" y="6" width="1" height="4" fill="#374151" />
      <rect x="9" y="6" width="1" height="4" fill="#374151" />
      
      {/* Barbatana dorsal */}
      <rect x="6" y="4" width="3" height="2" fill="#6b7280" />
      <rect x="7" y="3" width="2" height="1" fill="#4b5563" />
      
      {/* Barbatana caudal (cauda) */}
      <rect x="12" y="5" width="2" height="1" fill="#6b7280" />
      <rect x="12" y="6" width="3" height="4" fill="#6b7280" />
      <rect x="12" y="10" width="2" height="1" fill="#6b7280" />
      <rect x="14" y="6" width="1" height="1" fill="#4b5563" />
      <rect x="14" y="9" width="1" height="1" fill="#4b5563" />
      
      {/* Barbatana peitoral */}
      <rect x="4" y="9" width="2" height="2" fill="#6b7280" />
      
      {/* Brilho no corpo */}
      <rect x="4" y="7" width="1" height="1" fill="#d1d5db" />
      <rect x="6" y="7" width="1" height="1" fill="#d1d5db" />
      <rect x="8" y="8" width="1" height="1" fill="#d1d5db" />
      <rect x="10" y="7" width="1" height="1" fill="#d1d5db" />
    </svg>
  );
}

export function PupunhaIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Pupunha - fruta alaranjada/vermelha oval */}
      {/* Base laranja-avermelhada */}
      <rect x="6" y="4" width="4" height="2" fill="#ea580c" />
      <rect x="5" y="6" width="6" height="4" fill="#ea580c" />
      <rect x="6" y="10" width="4" height="2" fill="#ea580c" />
      
      {/* Sombra mais escura */}
      <rect x="5" y="8" width="2" height="2" fill="#c2410c" />
      <rect x="9" y="8" width="2" height="2" fill="#c2410c" />
      <rect x="6" y="10" width="4" height="2" fill="#c2410c" />
      
      {/* Textura/linhas características */}
      <rect x="6" y="6" width="1" height="4" fill="#9a3412" />
      <rect x="8" y="6" width="1" height="4" fill="#9a3412" />
      <rect x="10" y="6" width="1" height="4" fill="#9a3412" />
      
      {/* Brilho */}
      <rect x="7" y="5" width="2" height="1" fill="#fb923c" />
      <rect x="8" y="6" width="1" height="1" fill="#fdba74" />
      
      {/* Talo */}
      <rect x="7" y="2" width="2" height="2" fill="#65a30d" />
      <rect x="8" y="3" width="2" height="1" fill="#84cc16" />
    </svg>
  );
}

export function TambaquiIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Peixe Tambaqui - peixe robusto escuro com corpo mais largo */}
      {/* Corpo principal - cinza escuro/preto */}
      <rect x="3" y="6" width="9" height="5" fill="#4b5563" />
      <rect x="2" y="7" width="1" height="3" fill="#4b5563" />
      <rect x="12" y="7" width="1" height="3" fill="#4b5563" />
      
      {/* Cabeça mais robusta */}
      <rect x="2" y="7" width="3" height="3" fill="#374151" />
      <rect x="1" y="8" width="1" height="2" fill="#374151" />
      
      {/* Olho */}
      <rect x="3" y="8" width="1" height="1" fill="#ef4444" />
      
      {/* Barriga mais clara característica */}
      <rect x="4" y="9" width="6" height="2" fill="#6b7280" />
      
      {/* Barbatana dorsal mais alta */}
      <rect x="6" y="3" width="4" height="3" fill="#374151" />
      <rect x="7" y="2" width="2" height="1" fill="#1f2937" />
      
      {/* Barbatana caudal (cauda) robusta */}
      <rect x="12" y="5" width="2" height="1" fill="#374151" />
      <rect x="12" y="6" width="3" height="5" fill="#374151" />
      <rect x="12" y="11" width="2" height="1" fill="#374151" />
      <rect x="14" y="7" width="1" height="1" fill="#1f2937" />
      <rect x="14" y="9" width="1" height="1" fill="#1f2937" />
      
      {/* Barbatana peitoral */}
      <rect x="4" y="10" width="2" height="2" fill="#374151" />
      
      {/* Escamas/detalhes */}
      <rect x="5" y="7" width="1" height="1" fill="#6b7280" />
      <rect x="7" y="7" width="1" height="1" fill="#6b7280" />
      <rect x="9" y="8" width="1" height="1" fill="#6b7280" />
    </svg>
  );
}

export function PirarucuIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Peixe Pirarucu - peixe gigante alongado com escamas avermelhadas na cauda */}
      {/* Corpo principal - cinza prateado alongado */}
      <rect x="2" y="7" width="11" height="3" fill="#94a3b8" />
      <rect x="1" y="8" width="1" height="1" fill="#94a3b8" />
      <rect x="13" y="7" width="1" height="3" fill="#94a3b8" />
      
      {/* Cabeça alongada */}
      <rect x="1" y="8" width="3" height="1" fill="#64748b" />
      <rect x="2" y="7" width="2" height="1" fill="#64748b" />
      <rect x="2" y="10" width="2" height="1" fill="#64748b" />
      
      {/* Olho grande */}
      <rect x="3" y="8" width="1" height="1" fill="#fbbf24" />
      <rect x="3" y="8" width="1" height="1" fill="#0f172a" opacity="0.5" />
      
      {/* Barbatana dorsal longa */}
      <rect x="5" y="5" width="6" height="2" fill="#64748b" />
      <rect x="6" y="4" width="4" height="1" fill="#475569" />
      
      {/* Transição para a cauda com tons avermelhados */}
      <rect x="10" y="7" width="3" height="3" fill="#dc2626" opacity="0.4" />
      
      {/* Barbatana caudal (cauda) larga */}
      <rect x="13" y="5" width="2" height="1" fill="#dc2626" />
      <rect x="13" y="6" width="3" height="5" fill="#dc2626" />
      <rect x="13" y="11" width="2" height="1" fill="#dc2626" />
      <rect x="15" y="7" width="1" height="1" fill="#991b1b" />
      <rect x="15" y="9" width="1" height="1" fill="#991b1b" />
      
      {/* Barbatana anal longa */}
      <rect x="5" y="10" width="6" height="2" fill="#64748b" />
      <rect x="6" y="11" width="4" height="1" fill="#475569" />
      
      {/* Escamas grandes características */}
      <rect x="5" y="8" width="1" height="1" fill="#cbd5e1" />
      <rect x="7" y="8" width="1" height="1" fill="#cbd5e1" />
      <rect x="9" y="8" width="1" height="1" fill="#cbd5e1" />
      <rect x="11" y="8" width="1" height="1" fill="#cbd5e1" />
    </svg>
  );
}

export function BodoIcon({ size = 48 }: FoodIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Peixe Bodó - peixe achatado com manchas e barbatanas características */}
      {/* Corpo principal - marrom/cinza esverdeado achatado */}
      <rect x="3" y="7" width="10" height="4" fill="#78716c" />
      <rect x="2" y="8" width="1" height="2" fill="#78716c" />
      <rect x="13" y="7" width="1" height="4" fill="#78716c" />
      
      {/* Cabeça larga achatada */}
      <rect x="2" y="8" width="3" height="2" fill="#57534e" />
      <rect x="1" y="9" width="1" height="1" fill="#57534e" />
      
      {/* Olho pequeno */}
      <rect x="3" y="8" width="1" height="1" fill="#fbbf24" />
      
      {/* Manchas escuras características do bodó */}
      <rect x="5" y="7" width="1" height="1" fill="#44403c" />
      <rect x="7" y="8" width="1" height="1" fill="#44403c" />
      <rect x="9" y="7" width="1" height="1" fill="#44403c" />
      <rect x="11" y="8" width="1" height="1" fill="#44403c" />
      <rect x="6" y="9" width="1" height="1" fill="#44403c" />
      <rect x="10" y="9" width="1" height="1" fill="#44403c" />
      
      {/* Barbatana dorsal alta e espinhosa */}
      <rect x="6" y="4" width="4" height="3" fill="#57534e" />
      <rect x="7" y="3" width="1" height="1" fill="#44403c" />
      <rect x="9" y="3" width="1" height="1" fill="#44403c" />
      
      {/* Barbatana caudal característica */}
      <rect x="13" y="6" width="2" height="1" fill="#57534e" />
      <rect x="13" y="7" width="3" height="4" fill="#57534e" />
      <rect x="13" y="11" width="2" height="1" fill="#57534e" />
      <rect x="15" y="7" width="1" height="1" fill="#44403c" />
      <rect x="15" y="10" width="1" height="1" fill="#44403c" />
      
      {/* Barbatana peitoral larga */}
      <rect x="4" y="10" width="3" height="2" fill="#57534e" />
      <rect x="5" y="11" width="2" height="1" fill="#44403c" />
      
      {/* Textura de couraça/placas */}
      <rect x="5" y="8" width="1" height="1" fill="#a8a29e" />
      <rect x="8" y="9" width="1" height="1" fill="#a8a29e" />
      <rect x="12" y="8" width="1" height="1" fill="#a8a29e" />
    </svg>
  );
}