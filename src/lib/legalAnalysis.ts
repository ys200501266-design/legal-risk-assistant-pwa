import type { AnalysisInput, LegalAnalysis, LegalSource, RelatedLaw, RiskLevel, Scenario } from '../types';

interface LawIndexItem extends RelatedLaw {
  keywords: string[];
  sourceTitle: string;
}

const OFFICIAL_SOURCES: LegalSource[] = [
  {
    title: '国家法律法规数据库',
    url: 'https://flk.npc.gov.cn/',
    purpose: '检索法律、行政法规及条文原文',
  },
  {
    title: '全国人大法律法规检索',
    url: 'https://www.npc.gov.cn/',
    purpose: '核验法律名称、修订状态和公开发布信息',
  },
];

const LAW_INDEX: LawIndexItem[] = [
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动法',
    article: '第四十一条',
    articleTitle: '延长工作时间限制',
    keywords: ['劳动', '劳动合同', '公司', '加班', '延长工作时间', '工时', '每天加班'],
    originalExcerpt:
      '用人单位由于生产经营需要，经与工会和劳动者协商后可以延长工作时间，一般每日不得超过一小时；因特殊原因需要延长工作时间的，在保障劳动者身体健康的条件下延长工作时间每日不得超过三小时，但是每月不得超过三十六小时。',
    summary: '该条直接涉及用人单位延长工作时间的协商要求和时长限制。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问题中出现“公司要求加班、劳动合同、每天到晚上十点”等关键词，应先核验是否属于延长工作时间以及是否超过限制。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动法',
    article: '第四十四条',
    articleTitle: '延长工作时间工资报酬',
    keywords: ['加班费', '调休', '无偿加班', '工资', '劳动报酬', '休息日', '法定休假日'],
    originalExcerpt:
      '有下列情形之一的，用人单位应当按照下列标准支付高于劳动者正常工作时间工资的工资报酬：（一）安排劳动者延长工作时间的，支付不低于工资的百分之一百五十的工资报酬；（二）休息日安排劳动者工作又不能安排补休的，支付不低于工资的百分之二百的工资报酬；（三）法定休假日安排劳动者工作的，支付不低于工资的百分之三百的工资报酬。',
    summary: '该条涉及延长工作时间、休息日和法定休假日工作的工资报酬标准。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问题中如果出现“没有加班费、没有调休、无偿加班”，该条与解决方案直接相关。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动合同法',
    article: '第二条',
    articleTitle: '适用范围',
    keywords: ['实习生', '实习', '劳动合同', '劳务合同', '劳动关系', '用人单位', '劳动者'],
    originalExcerpt:
      '中华人民共和国境内的企业、个体经济组织、民办非企业单位等组织与劳动者建立劳动关系，订立、履行、变更、解除或者终止劳动合同，适用本法。',
    summary: '该条说明劳动合同法适用于用人单位与劳动者建立劳动关系的情形。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问“实习生签劳动合同还是劳务合同”，关键不是“实习生”这个称呼，而是是否与单位建立劳动关系。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动合同法',
    article: '第七条',
    articleTitle: '劳动关系建立',
    keywords: ['实习生', '实习', '劳动关系', '用工', '入职', '劳动合同'],
    originalExcerpt: '用人单位自用工之日起即与劳动者建立劳动关系。',
    summary: '该条说明劳动关系通常从实际用工之日起建立。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '如果实习生实际接受单位管理、提供劳动并取得报酬，需要重点判断是否已形成用工和劳动关系。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动合同法',
    article: '第十条',
    articleTitle: '订立书面劳动合同',
    keywords: ['实习生', '实习', '劳动合同', '书面劳动合同', '劳动关系', '用工'],
    originalExcerpt: '建立劳动关系，应当订立书面劳动合同。',
    summary: '该条直接规定建立劳动关系时应当订立书面劳动合同。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '如果实习安排已经构成劳动关系，依据该条应签书面劳动合同，而不是仅以“劳务合同”替代。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国民法典',
    article: '第四百六十四条',
    articleTitle: '合同定义',
    keywords: ['实习生', '实习', '劳务合同', '民事合同', '协议', '合同'],
    originalExcerpt: '合同是民事主体之间设立、变更、终止民事法律关系的协议。',
    summary: '该条可用于说明不属于劳动关系的实习、劳务或合作安排，可能回到民事合同规则处理。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '如果只是教学实习、短期实践或非劳动关系安排，可能签署实习协议、劳务协议等民事合同，但仍需看实际权利义务。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国劳动法',
    article: '第三十条',
    articleTitle: '劳动报酬',
    keywords: ['工资', '劳动报酬', '拖欠工资', '加班费', '劳动合同'],
    originalExcerpt: '用人单位应当按照劳动合同约定和国家规定，向劳动者及时足额支付劳动报酬。',
    summary: '该条用于核验工资、加班费等劳动报酬是否及时足额支付。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '如果用户的问题涉及劳动合同约定和实际工资支付，应结合工资条、银行流水和合同条款核验。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国民法典',
    article: '第五百零九条',
    articleTitle: '合同履行原则',
    keywords: ['合同', '租房合同', '劳动合同', '履行', '约定', '诚信', '押金', '扣款'],
    originalExcerpt: '当事人应当按照约定全面履行自己的义务。当事人应当遵循诚信原则，根据合同的性质、目的和交易习惯履行通知、协助、保密等义务。',
    summary: '该条用于判断合同双方是否按约定和诚信原则履行义务。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问题如果涉及合同约定、押金扣款、履行义务，应先回到合同条款和履行事实。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国民法典',
    article: '第五百七十七条',
    articleTitle: '违约责任',
    keywords: ['违约', '不履行', '拒绝退', '拒退', '扣押金', '赔偿', '合同'],
    originalExcerpt: '当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。',
    summary: '该条用于分析一方不按合同履行时可能承担的违约责任。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '当用户描述对方拒绝履行、拒退押金或不按合同处理时，该条可作为解决方案的基础。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国民法典',
    article: '第七百零三条',
    articleTitle: '租赁合同定义',
    keywords: ['租房', '租赁', '房东', '押金', '退租', '租房合同'],
    originalExcerpt: '租赁合同是出租人将租赁物交付承租人使用、收益，承租人支付租金的合同。',
    summary: '该条用于确认房东与租客之间的争议属于租赁合同关系。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问题中出现租房、房东、押金、退租等关键词时，应先确认租赁合同关系。',
    matchedKeywords: [],
  },
  {
    sourceTitle: '国家法律法规数据库',
    lawName: '中华人民共和国消费者权益保护法',
    article: '第二十五条',
    articleTitle: '七日无理由退货',
    keywords: ['网购', '退货', '退款', '七天无理由', '商家', '消费者', '拆封', '快递'],
    originalExcerpt:
      '经营者采用网络、电视、电话、邮购等方式销售商品，消费者有权自收到商品之日起七日内退货，且无需说明理由，但下列商品除外：消费者定作的；鲜活易腐的；在线下载或者消费者拆封的音像制品、计算机软件等数字化商品；交付的报纸、期刊。',
    summary: '该条规定了网络购物等远程销售场景下七日无理由退货及例外情形。',
    sourceUrl: 'https://flk.npc.gov.cn/',
    relevance: '用户问题如果涉及网购、退货、商家拒绝七天无理由退货，应先判断商品是否属于例外情形。',
    matchedKeywords: [],
  },
];

function parseUserSources(sourceLinks?: string): LegalSource[] {
  if (!sourceLinks?.trim()) return [];

  return sourceLinks
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((url, index) => ({
      title: `用户提供来源 ${index + 1}`,
      url,
      purpose: '优先作为检索入口；Demo 中展示为来源记录，正式版应实时抓取该链接正文。',
    }));
}

function inferScenario(text: string, fallback: Scenario): Scenario {
  if (/加班|工资|劳动|公司|员工|离职|劳动合同|调休/.test(text)) return '劳动';
  if (/租房|房东|押金|租赁|退租|租房合同/.test(text)) return '租房';
  if (/退款|退货|商家|消费者|网购|七天|快递/.test(text)) return '消费';
  if (/聊天|微信|记录|截图/.test(text)) return '聊天记录';
  if (/合同|违约|条款|签字|履行/.test(text)) return '合同';
  return fallback || '其他';
}

function extractKeywords(question: string, scenario: Scenario): string[] {
  const dictionary = Array.from(new Set(LAW_INDEX.flatMap((item) => item.keywords)));
  const hits = dictionary.filter((keyword) => question.includes(keyword));
  if (hits.length === 0 && scenario !== '其他') hits.push(scenario);
  return Array.from(new Set(hits));
}

function searchLawIndex(question: string, scenario: Scenario): RelatedLaw[] {
  const keywords = extractKeywords(question, scenario);

  return LAW_INDEX.map((item) => {
    const matchedKeywords = item.keywords.filter((keyword) => keywords.includes(keyword) || question.includes(keyword));
    return { ...item, matchedKeywords };
  })
    .filter((item) => item.matchedKeywords.length > 0)
    .sort((a, b) => b.matchedKeywords.length - a.matchedKeywords.length)
    .slice(0, 4);
}

function buildFacts(input: AnalysisInput, scenario: Scenario, laws: RelatedLaw[]): string[] {
  const facts = [`用户原问题：${input.text.trim() || '未输入文字问题'}`, `系统按关键词判断问题类型为：${scenario}`];
  if (input.imageName) facts.push(`用户上传了材料：${input.imageName}，正式版应先 OCR 后再检索。`);
  if (laws.length) {
    facts.push(`检索命中关键词：${Array.from(new Set(laws.flatMap((law) => law.matchedKeywords))).join('、')}`);
  }
  return facts;
}

function inferRiskLevel(laws: RelatedLaw[]): RiskLevel {
  if (!laws.length) return '无法判断';
  if (laws.some((law) => law.lawName.includes('劳动法') && law.matchedKeywords.some((keyword) => ['无偿加班', '加班费', '调休'].includes(keyword)))) {
    return '高风险';
  }
  return laws.length >= 2 ? '中风险' : '低风险';
}

function buildReasoning(laws: RelatedLaw[]): string {
  if (!laws.length) {
    return '系统未能从当前来源索引中定位到与用户关键词直接匹配的具体条文，因此不生成确定性解决方案。';
  }

  const lawNames = laws.map((law) => `${law.lawName}${law.article}`).join('、');
  return `系统没有改写用户问题，而是从原问题中提取关键词后，在来源索引中命中 ${lawNames}。下面的方案只基于这些已定位条文和用户提供事实进行风险提示。`;
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word));
}

function buildSolution(question: string, scenario: Scenario, laws: RelatedLaw[]): string[] {
  if (!laws.length) {
    return ['补充更具体的事实，例如合同条款、发生时间、对方主体、金额和沟通记录。', '补充可检索的权威来源链接，或咨询专业人士核验适用法条。'];
  }

  if (scenario === '劳动') {
    const asksOvertimePay = includesAny(question, ['加班费', '无偿加班', '不给加班费', '没有加班费', '调休', '加班到']);
    const asksInternContract = includesAny(question, ['实习生', '实习']) && includesAny(question, ['劳动合同', '劳务合同', '签什么合同', '签哪种合同', '合同']);
    const asksContractOnly = includesAny(question, ['劳动合同']) && !asksOvertimePay && !includesAny(question, ['工资', '离职', '解除', '赔偿', '拖欠']);

    if (asksInternContract) {
      return [
        '结论：不能只因为身份叫“实习生”就一律签劳务合同。法律判断点是是否建立劳动关系。',
        '如果实习生与单位之间已经形成实际用工关系，例如接受单位日常管理、按岗位提供劳动、取得劳动报酬，依据劳动合同法第二条、第七条、第十条，应按劳动关系处理，并订立书面劳动合同。',
        '如果只是学校教学安排、短期实践、观摩培训，双方没有建立劳动法意义上的用工管理和劳动报酬关系，则通常不按劳动合同处理，可以签实习协议或劳务性质的民事协议，适用民法典合同规则。',
        '所以回答你的问题：实习生签劳动合同还是劳务合同，不能看名称，要看实际关系；构成劳动关系签劳动合同，不构成劳动关系才考虑实习协议/劳务协议。',
      ];
    }

    if (asksContractOnly) {
      return [
        '你目前只提到“劳动合同”，还没有说明具体争议点。请补充：合同哪一条、公司做了什么、你认为哪里不合理。',
        '如果争议是加班，就补充加班时间、是否审批、是否支付加班费或安排调休；如果争议是工资，就补充工资条和实际到账记录。',
        '在补充事实前，只能先依据劳动合同法第三十条提示：工资和劳动报酬应按合同约定和国家规定及时足额支付，不能直接判断公司责任。',
      ];
    }

    if (asksOvertimePay) {
      return [
        '你的问题核心是“公司安排加班但未支付加班费或未安排调休”。先保存劳动合同、考勤记录、加班通知、工作群消息、工资条和银行流水。',
        '对照劳动法第四十一条，核验加班是否经过协商、是否属于延长工作时间，以及每日/月度时长是否明显超过限制。',
        '对照劳动法第四十四条，区分工作日延长工作时间、休息日加班且不能补休、法定节假日加班三种情况，再计算可能对应的加班工资标准。',
        '先向 HR 或主管书面询问“加班依据、补偿方式、调休记录”。如果对方不回应或拒绝说明，再带证据咨询劳动监察或劳动仲裁窗口。',
      ];
    }

    return [
      '你提出的是劳动类问题，但目前具体争议还不够明确。请补充：公司具体要求、发生时间、合同条款、工资或加班记录。',
      '先不要直接下结论，先把劳动合同、工资条、考勤、通知和沟通记录放在一起核对。',
      '再根据补充事实判断适用劳动法第四十一条、第四十四条，或劳动合同法第三十条中的哪一类问题。',
    ];
  }

  if (scenario === '租房') {
    const asksDeposit = includesAny(question, ['押金', '拒退', '不退', '扣押金', '退押金', '扣款']);
    const asksLeaseOnly = includesAny(question, ['租房合同', '租赁合同']) && !asksDeposit && !includesAny(question, ['维修', '损坏', '退租', '违约']);

    if (asksLeaseOnly) {
      return [
        '你目前只提到“租房合同”，还没有说明具体争议。请补充：是哪一条合同条款、房东或租客做了什么、你想解决什么问题。',
        '如果争议是押金，请补充押金金额、退租时间、房东拒退理由、是否有维修票据或损坏照片。',
        '在事实不足前，只能先依据民法典第五百零九条提示：双方应按合同约定和诚信原则履行，不能直接判断谁违约。',
      ];
    }

    if (asksDeposit) {
      return [
        '你的问题核心是“押金是否应退、房东是否有依据扣款”。先整理租房合同、押金支付记录、退租交接照片或视频、钥匙交还记录和聊天记录。',
        '对照民法典第五百零九条，先看合同里是否写明押金扣除条件；没有明确约定时，应要求房东说明扣款依据。',
        '对照民法典第五百七十七条，如果合同约定退租后返还押金，而房东拒退或无证据扣款，可要求其承担继续履行或赔偿损失等违约责任风险。',
        '你可以先书面要求房东列明扣款项目、金额、维修票据和损失证明；协商不成时，再带证据咨询调解组织、住建/消协渠道或法院窗口。',
      ];
    }

    return [
      '你提出的是租房类问题，但目前缺少具体争议点。请补充：租赁合同条款、退租时间、费用金额、对方拒绝或要求的具体内容。',
      '先按民法典第五百零九条回到合同约定和履行事实，不要只凭口头说法判断。',
      '把合同、付款记录、房屋照片、交接记录和聊天记录整理后，再判断是否涉及押金、维修费或违约责任。',
    ];
  }

  if (scenario === '消费') {
    const asksReturn = includesAny(question, ['退货', '退款', '七天无理由', '拒绝退', '拆快递', '拆封']);

    if (asksReturn) {
      return [
        '你的问题核心是“商家是否可以拒绝退货/退款”。先保存订单、物流签收时间、商品照片、商家拒绝退货聊天记录和平台规则截图。',
        '对照消费者权益保护法第二十五条，先判断购买方式是否属于网络等远程销售，以及是否仍在收到商品七日内。',
        '再判断商品是否属于条文列明的例外，例如定作、鲜活易腐、已拆封的音像制品或计算机软件等数字化商品。普通商品仅拆快递外包装，通常还要继续看是否影响二次销售。',
        '如果商家只用笼统理由拒绝，你可以通过平台售后要求其说明具体例外依据；平台介入无果时，再考虑消费者投诉渠道。',
      ];
    }

    return [
      '你提出的是消费类问题，但目前未说明具体是退货、退款、质量问题还是虚假宣传。请补充订单、商品、金额、商家拒绝理由。',
      '先保存订单和沟通记录，再根据具体争议匹配消费者权益保护法相应条款。',
    ];
  }

  const asksBreach = includesAny(question, ['违约', '不履行', '拒绝', '赔偿', '解除', '逾期', '没按合同']);
  if (!asksBreach && includesAny(question, ['合同'])) {
    return [
      '你目前只提到“合同”，还没有说明具体争议。请补充：哪一条合同、谁没有履行、造成了什么损失、你希望对方怎么处理。',
      '在事实不足时，只能先依据民法典第五百零九条提示：合同双方应按约定全面履行并遵循诚信原则。',
      '补充事实后，再判断是否进入民法典第五百七十七条所说的继续履行、补救措施或赔偿损失路径。',
    ];
  }

  return [
    '你的问题核心是合同履行或违约。先把合同条款、履行记录、付款记录和沟通记录整理成时间线。',
    '对照民法典第五百零九条，先确认双方各自应履行的义务和实际履行情况。',
    '如果对方确实不履行或履行不符合约定，再对照民法典第五百七十七条，选择继续履行、补救措施或赔偿损失作为沟通诉求。',
    '先发书面催告并保留证据；金额较大或证据复杂时，咨询律师评估调解、仲裁或诉讼路径。',
  ];
}

function buildEvidence(scenario: Scenario): string[] {
  if (scenario === '劳动') return ['劳动合同', '考勤记录', '加班通知或工作群记录', '工资条', '银行流水'];
  if (scenario === '租房') return ['租赁合同', '押金收据或转账记录', '退租交接记录', '房屋照片或视频', '房东扣款说明'];
  if (scenario === '消费') return ['订单详情', '物流签收记录', '商品状态照片', '商家聊天记录', '平台售后规则'];
  return ['合同原文', '付款凭证', '履行记录', '催告通知', '双方沟通记录'];
}

export function analyzeLegalQuestion(input: AnalysisInput): LegalAnalysis {
  const userQuestion = input.text.trim();
  const scenario = inferScenario(`${input.scenario} ${userQuestion}`, input.scenario);
  const searchSources = [...parseUserSources(input.sourceLinks), ...OFFICIAL_SOURCES];
  const relatedLaws = searchLawIndex(userQuestion, scenario);
  const searchKeywords = Array.from(new Set(relatedLaws.flatMap((law) => law.matchedKeywords)));

  return {
    userQuestion: userQuestion || '未输入文字问题',
    recognizedQuestion: userQuestion || '未输入文字问题',
    scenario,
    searchSources,
    searchKeywords,
    extractedFacts: buildFacts(input, scenario, relatedLaws),
    riskLevel: inferRiskLevel(relatedLaws),
    relatedLaws,
    reasoning: buildReasoning(relatedLaws),
    solutionPlan: buildSolution(userQuestion, scenario, relatedLaws),
    nextEvidence: buildEvidence(scenario),
    noBasisMessage: relatedLaws.length ? undefined : '未找到明确法律依据，建议补充信息或咨询专业人士。',
    disclaimer: '本工具仅提供法律信息检索与风险提示，不构成法律意见，不替代律师或司法机关判断。',
  };
}

export const defaultSourceLinks = OFFICIAL_SOURCES.map((source) => source.url).join('\n');
