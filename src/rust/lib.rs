extern crate libc;
extern crate rcalc;

use std::ffi::{CStr, CString};
use std::str;
use libc::c_char;

#[no_mangle]
pub extern "C" fn calc(program: *const c_char) -> *const c_char {
    let c_program = unsafe { CStr::from_ptr(program).to_bytes() };
    match str::from_utf8(c_program) {
        Ok(prog) => {
            match rcalc::Interpreter::process(prog) {
                Ok(n) => CString::new(n.to_string()).unwrap().into_raw(),
                Err(e) => CString::new(e.to_string()).unwrap().into_raw(),
            }
        }
        Err(_) => {
            CString::new("Expression not parsable; likely a server error.")
                .unwrap()
                .into_raw()
        }
    }
}
