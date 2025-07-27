import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Update UI state
  const [checking, setChecking] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [versionInfo, setVersionInfo] = useState<any>()
  const [updateError, setUpdateError] = useState<any>()
  const [progressInfo, setProgressInfo] = useState<any>()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalBtn, setModalBtn] = useState({
    cancelText: 'Close',
    okText: 'Update',
    onCancel: () => setModalOpen(false),
    onOk: () => window.ipcRenderer.invoke('start-download'),
  })

  const checkUpdate = async () => {
    setChecking(true)
    const result = await window.ipcRenderer.invoke('check-update')
    setProgressInfo({ percent: 0 })
    setChecking(false)
    setModalOpen(true)
    if (result?.error) {
      setUpdateAvailable(false)
      setUpdateError(result?.error)
    }
  }

  const onUpdateCanAvailable = useCallback((_event: any, arg1: any) => {
    setVersionInfo(arg1)
    setUpdateError(undefined)
    if (arg1.update) {
      setModalBtn(state => ({
        ...state,
        cancelText: 'Cancel',
        okText: 'Update',
        onOk: () => window.ipcRenderer.invoke('start-download'),
      }))
      setUpdateAvailable(true)
    } else {
      setUpdateAvailable(false)
    }
  }, [])

  const onUpdateError = useCallback((_event: any, arg1: any) => {
    setUpdateAvailable(false)
    setUpdateError(arg1)
  }, [])

  const onDownloadProgress = useCallback((_event: any, arg1: any) => {
    setProgressInfo(arg1)
  }, [])

  const onUpdateDownloaded = useCallback((_event: any) => {
    setProgressInfo({ percent: 100 })
    setModalBtn(state => ({
      ...state,
      cancelText: 'Later',
      okText: 'Install now',
      onOk: () => window.ipcRenderer.invoke('quit-and-install'),
    }))
  }, [])

  useEffect(() => {
    window.ipcRenderer.on('update-can-available', onUpdateCanAvailable)
    window.ipcRenderer.on('update-error', onUpdateError)
    window.ipcRenderer.on('download-progress', onDownloadProgress)
    window.ipcRenderer.on('update-downloaded', onUpdateDownloaded)
    return () => {
      window.ipcRenderer.off('update-can-available', onUpdateCanAvailable)
      window.ipcRenderer.off('update-error', onUpdateError)
      window.ipcRenderer.off('download-progress', onDownloadProgress)
      window.ipcRenderer.off('update-downloaded', onUpdateDownloaded)
    }
  }, [])

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center">
      <div className="flex justify-center items-center gap-8 mb-8">
        <a href="https://vitejs.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="logo h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="logo react h-24 w-24" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Your App Name</h1>
      <div className="card bg-base-200 shadow-xl p-6 max-w-md mx-auto">
        <button 
          className="btn btn-primary mb-4 w-full"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-center mb-4">
          Edit <code className="bg-base-300 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
        <button 
          className="btn btn-secondary w-full" 
          disabled={checking} 
          onClick={checkUpdate}
        >
          {checking ? 'Checking...' : 'Check for Updates'}
        </button>
      </div>
      <p className="read-the-docs text-center mt-8 text-base-content/70">
        Click on the Vite and React logos to learn more
      </p>
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-300 text-base-content max-w-md">
            <div className="mb-4">
              {updateError ? (
                <div>
                  <p className="text-error mb-2">Error downloading the latest version.</p>
                  <p className="text-error text-sm">{updateError.message}</p>
                </div>
              ) : updateAvailable ? (
                <div>
                  <div className="text-success mb-2">The latest version is: v{versionInfo?.newVersion}</div>
                  <div className="text-base-content/70 text-sm mb-4">Current: v{versionInfo?.version} → v{versionInfo?.newVersion}</div>
                  <div className="mb-4">
                    <div className="text-sm mb-2">Update progress:</div>
                    <div className="bg-base-200 rounded-full h-4 w-full overflow-hidden">
                      <div 
                        className="bg-success h-full transition-all duration-300" 
                        style={{width: `${progressInfo?.percent||0}%`}}
                      ></div>
                    </div>
                    <div className="text-xs mt-2 text-base-content/70">{progressInfo?.percent ? `${progressInfo.percent.toFixed(1)}%` : '0%'}</div>
                  </div>
                </div>
              ) : (
                <div className="text-base-content/50">
                  No update available.<br/>
                  <pre className="text-xs mt-2 bg-base-200 p-2 rounded overflow-auto">
                    {JSON.stringify(versionInfo ?? {}, null, 2)}
                  </pre>
                </div>
              )}
            </div>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={modalBtn.onCancel}>
                {modalBtn.cancelText||'Close'}
              </button>
              {updateAvailable && (
                <button className="btn btn-primary" onClick={modalBtn.onOk}>
                  {modalBtn.okText||'Update'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
