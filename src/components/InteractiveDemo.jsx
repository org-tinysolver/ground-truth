import React, { useState } from 'react';

// 탭 컴포넌트
export function Tabs({ children, labels }) {
  const [activeTab, setActiveTab] = useState(0);
  const childArray = React.Children.toArray(children);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid var(--ifm-color-emphasis-200)',
        marginBottom: '1rem'
      }}>
        {labels.map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === idx ? 'var(--ifm-color-primary)' : 'transparent',
              color: activeTab === idx ? 'white' : 'inherit',
              cursor: 'pointer',
              fontWeight: activeTab === idx ? 'bold' : 'normal',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease'
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ padding: '1rem' }}>
        {childArray[activeTab]}
      </div>
    </div>
  );
}

// 아코디언 컴포넌트
export function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ 
      marginBottom: '0.5rem',
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--ifm-color-emphasis-100)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '1rem'
        }}
      >
        <span>{title}</span>
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease'
        }}>
          ▼
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease',
        padding: isOpen ? '1rem' : '0 1rem'
      }}>
        {children}
      </div>
    </div>
  );
}

// 퀴즈 컴포넌트
export function Quiz({ question, options, correctIndex, explanation }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    setSelected(idx);
    setShowResult(true);
  };

  const isCorrect = selected === correctIndex;

  return (
    <div style={{ 
      padding: '1.5rem',
      background: 'var(--ifm-color-emphasis-100)',
      borderRadius: '12px',
      marginBottom: '1.5rem'
    }}>
      <h4 style={{ marginTop: 0 }}>🧠 퀴즈</h4>
      <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{question}</p>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            disabled={showResult}
            style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              border: '2px solid',
              borderColor: showResult 
                ? idx === correctIndex 
                  ? '#10b981' 
                  : idx === selected 
                    ? '#ef4444' 
                    : 'var(--ifm-color-emphasis-300)'
                : 'var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              background: showResult && idx === correctIndex ? '#d1fae5' : 'white',
              cursor: showResult ? 'default' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: isCorrect ? '#d1fae5' : '#fee2e2',
          borderRadius: '8px',
          color: isCorrect ? '#065f46' : '#991b1b'
        }}>
          <strong>{isCorrect ? '✅ 정답!' : '❌ 오답!'}</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}

// 스텝 가이드 컴포넌트
export function StepGuide({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* 진행 바 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '5%',
          right: '5%',
          height: '4px',
          background: 'var(--ifm-color-emphasis-200)',
          zIndex: 0
        }}>
          <div style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
            height: '100%',
            background: 'var(--ifm-color-primary)',
            transition: 'width 0.3s ease'
          }} />
        </div>
        {steps.map((step, idx) => (
          <div 
            key={idx}
            onClick={() => setCurrentStep(idx)}
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 1
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: idx <= currentStep ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-200)',
              color: idx <= currentStep ? 'white' : 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}>
              {idx + 1}
            </div>
            <span style={{ 
              fontSize: '0.75rem', 
              marginTop: '0.5rem',
              fontWeight: idx === currentStep ? 'bold' : 'normal'
            }}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* 현재 스텝 내용 */}
      <div style={{
        padding: '1.5rem',
        background: 'var(--ifm-color-emphasis-100)',
        borderRadius: '12px',
        minHeight: '150px'
      }}>
        <h3 style={{ marginTop: 0 }}>{steps[currentStep].title}</h3>
        <div>{steps[currentStep].content}</div>
      </div>

      {/* 네비게이션 버튼 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginTop: '1rem'
      }}>
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          style={{
            padding: '0.5rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            background: currentStep === 0 ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-color-primary)',
            color: currentStep === 0 ? 'var(--ifm-color-emphasis-500)' : 'white',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← 이전
        </button>
        <button
          onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
          disabled={currentStep === steps.length - 1}
          style={{
            padding: '0.5rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            background: currentStep === steps.length - 1 ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-color-primary)',
            color: currentStep === steps.length - 1 ? 'var(--ifm-color-emphasis-500)' : 'white',
            cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          다음 →
        </button>
      </div>
    </div>
  );
}

// 카운터 (간단한 데모)
export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: 'var(--ifm-color-emphasis-100)',
      borderRadius: '12px'
    }}>
      <button
        onClick={() => setCount(c => c - 1)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--ifm-color-primary)',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
      >
        -
      </button>
      <span style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold',
        minWidth: '60px',
        textAlign: 'center'
      }}>
        {count}
      </span>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--ifm-color-primary)',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
      >
        +
      </button>
    </div>
  );
}

// 토글 스위치
export function Toggle({ label, onChange }) {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    onChange?.(!isOn);
  };

  return (
    <label style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '0.75rem',
      cursor: 'pointer' 
    }}>
      <div
        onClick={handleToggle}
        style={{
          width: '50px',
          height: '26px',
          background: isOn ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
          borderRadius: '13px',
          position: 'relative',
          transition: 'background 0.2s ease'
        }}
      >
        <div style={{
          width: '22px',
          height: '22px',
          background: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: isOn ? '26px' : '2px',
          transition: 'left 0.2s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} />
      </div>
      <span>{label}</span>
    </label>
  );
}

